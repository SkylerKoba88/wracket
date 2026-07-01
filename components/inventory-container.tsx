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

const TypeSection: React.FC<{type: string, sectionItems: Item[]}> = ({type, sectionItems}) => {
    const scrollContainerRef = React.useRef<HTMLDivElement>(null);

    const scroll  = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const scrollAmount = 300; // Adjust this value as needed
            const newScrollLeft = direction === 'left' 
                ? scrollContainerRef.current.scrollLeft - scrollAmount 
                : scrollContainerRef.current.scrollLeft + scrollAmount;
            scrollContainerRef.current.scrollTo({ left: newScrollLeft, behavior: 'smooth' });
        }
    }

        return (
            <div className="type-section">
                <h3>{type}</h3>
                <div className="type-scroll">
                    <button className="scroll-button left" onClick={() => scroll('left')}>&#8249;</button>
                </div>
                <div className="type-items" ref={scrollContainerRef}>
                    {sectionItems.map(item => (
                        <ItemPreview key={item.id} item={item}/>
                    ))}
                </div>
                <div className="type-scroll">
                    <button className="scroll-button right" onClick={() => scroll('right')}>&#8250;</button>
                </div>
            </div>
        );
}

export const InventoryContainer: React.FC<InventoryContainerProps> = ({
    searchQuery = '',
    initialSelected = 'apparel',
    items = []
}) => {
    const [selected, setSelected] = useState<string>(initialSelected);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', selected);
    }, [selected]);

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
                        <TypeSection key={type} type={type} sectionItems={sectionItems} />
                    )) : (
                        <p style={{padding: "1rem"}}>No items in this category yet!</p>
                    )}
                </div>
                
            </div>
    )
};