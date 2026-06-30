// this file moves each icon independently when the user moves the mouse over it.

"use client";
import React, {useRef} from 'react';

interface NudgeWrapperProps{
    children: React.ReactNode;
}

export const NudgeWrapper: React.FC<NudgeWrapperProps> = ({children}) => {
    const wrapperRef = useRef<HTMLDivElement>(null);
    
    const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
        const el = wrapperRef.current;
        if (!el) return;

        const rect = el.getBoundingClientRect();
        const centerX = rect.left + rect.width / 4;
        const centerY = rect.top + rect.height / 4;
        const moveX = (event.clientX - centerX) / 1;
        const moveY = (event.clientY - centerY) / 1;

        el.style.transform = `translate(${moveX}px, ${moveY}px)`;
    };

    const handleMouseLeave = () => {
        if (wrapperRef.current) {
            wrapperRef.current.style.transform = 'translate(0,0)';
        }
    };

    return (
        <div
            ref={wrapperRef}
            className="inline-block"
            style={{transition: 'transform 0.2s ease', willChange: 'transform'}}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            {children}
        </div>
    )
}