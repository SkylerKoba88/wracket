"use client";
import React, {useState, ReactNode, useEffect} from 'react';
import './../InventoryContainer.css';
import { ItemPreview } from './item-preview';

// change scrolling to be an arrow for desktop and keep draggable for mobile

interface Item {
    id: number;
    name: string;
    keywords: string;
    quantity: number;
    price: number;
    img_url: string;
    category: string;
    type: string;
}

interface InventoryContainerProps {
    searchQuery?: string;
    initialSelected?: string;
    items: Item[];
}

export const InventoryContainer: React.FC<InventoryContainerProps> = ({
    searchQuery = '',
    initialSelected = 'apparel',
    items = []
}) => {
    const [selected, setSelected] = useState<string>(initialSelected);

    const [isDragging, setIsDragging] = useState(false);
    const [dragStartX, setDragStartX] = useState<number>(0);
    const [scrollStartX, setScrollStartX] = useState<number>(0);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', selected);
    }, [selected]);

    const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
        setIsDragging(true);
        setDragStartX(event.clientX);
        setScrollStartX(event.currentTarget.scrollLeft)
        event.currentTarget.setPointerCapture(event.pointerId);
        event.currentTarget.style.cursor = 'grabbing';
    }

    const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
        if (!isDragging) return;
        const container = event.currentTarget;
        const delta = event.clientX - dragStartX;
        container.scrollLeft = scrollStartX - delta;
    }

    const onPointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
        setIsDragging(false);
        const container = event.currentTarget;
        if (container.hasPointerCapture(event.pointerId)) {
            container.releasePointerCapture(event.pointerId);
        }
        container.style.cursor = 'grab';
    }

    const changeCategory = (category: string) => {
        setSelected(category);
    }

    const filteredAll = items.filter(item => {
        const matchesCategory = item.category === selected;
        const matchesSearch = item.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            item.keywords?.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });                 
    
    const groupedByType = filteredAll.reduce((groups, item) => {
            const type = item.type || 'unknown';
            if (!groups[type]) {
                groups[type] = [];
            }
            groups[type].push(item);
            return groups;
    }, {} as Record<string, Item[]>);

    return (
        <div className="inventory-container">
                <div className="tabs">
                    {['apparel', 'prints', 'functional', 'misc'].map((category) => (
                        <button
                            key={category}
                            id={category}
                            className={selected === category? 'selected': 'not-selected'}
                            onClick={() => changeCategory(category)}
                        >
                            {category.charAt(0).toUpperCase()+ category.slice(1)}
                        </button>
                    ))}
                </div>

                <div className="results" >
                    {filteredAll.length > 0 ? Object.entries(groupedByType).map(([type, sectionItems]) => (
                        <div key={type} className="type-section">
                            <h3>{type}</h3>
                            <div className="type-scroll">
                                <div className="type-items"
                                    onPointerDown={onPointerDown}
                                    onPointerMove={onPointerMove}
                                    onPointerUp={onPointerUp}
                                    onPointerCancel={onPointerUp}
                                >
                                    {sectionItems.map(item => (
                                        <ItemPreview key={item.id} item={item}/>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )) : (
                        <p style={{padding: "1rem"}}>No items in this category yet!</p>
                    )}
                </div>
                
            </div>
    )
};