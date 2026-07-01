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
            <Link href="/">Home</Link>
            <Link href="/shop">Shop</Link>
            <Link href="/">About</Link>
            <Link href="/">Help</Link>
            <Link href="/">Cart</Link>
        </nav>
);
};

