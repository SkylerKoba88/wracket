"use client";
import React, {useState, ReactNode} from 'react';
import './../NavBar.css';
import Link from 'next/link';

interface NavBarProps {
    //title?: string;
}

export const NavBar: React.FC<NavBarProps> = ({
    //title = 'NavBar';
}) => {
    // insert constructor state here
    const [count, setCount] = useState<number>(0);

    //function
    //const handleClick = () => {}

    return (
        <nav>
            <a href="/index.html">Home</a>
            <Link href="/shop">Shop</Link>
            <a href="/pages/gallery.html">Gallery</a>
            <a href="/pages/comingsoon.html">About</a>
            <a href="/pages/maintenance.html">Help</a>
            <a href="/pages/product-detail.html">Cart</a>
        </nav>
);
};

