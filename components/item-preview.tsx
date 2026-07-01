"use client";
import React, {useState, ReactNode, useEffect} from 'react';
import './../ItemPreview.css';
import Link from 'next/link';

interface Item {
    id?: number;
    name? : string;
    keywords?: string;
    quantity?: number;
    price?: number;
    img_url?: string;
}
interface ItemPreviewProps {
    item?: Item;
}

export const ItemPreview: React.FC<ItemPreviewProps> = ({
    item = {
        id:0,
        name: "Product",
        keywords: "",
        quantity: 0,
        price: 5.00,
        img_url: ""
    }
}) => {
    const [isSoldOut, setIsSoldOut] = useState(false);

    useEffect(() => {
        setIsSoldOut(item.quantity === 0);
    }, [item.quantity]);

    return(
        <Link href={`/product/${item.id}`}>
            <div className="item-preview">
                <div className={`img-container ${isSoldOut ? 'soldout' : ''}`}>
                    <img id="product" src={item.img_url} alt={item.name} />
                    <div className="overlay">
                        <p>SOLD</p>
                        <img src="/soldout.svg" alt="sold out" width="100" height="100"/>
                        <p>OUT</p>
                    </div>
                </div>

                <div className="text">
                    <h4>{item.name}</h4>
                    <div className="item-details">
                        <p>{item.keywords}</p>
                        <p style={{ width: '50%', textAlign: 'end'}}>Price: ${item.price}</p>
                    </div>
                </div>
            </div>
        </Link>
    );
};