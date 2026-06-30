"use client";
import React, {useState, ReactNode, useEffect} from 'react';
import './../SearchBar.css';

interface SearchBarProps {
    onResultsFetched: (results: any[]) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
    onResultsFetched
}) => {
    const [search, setSearch] = useState('');
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (search.trim() === '') {
            onResultsFetched([]);
            return;
        }

        fetch(`/search?query=${encodeURIComponent(search)}`)
        .then((response) => response.json())
        .then((data) => {
            console.log("results fetched");
            onResultsFetched(data);
        })
        .catch((error) => {
            console.error("Error fetching results:", error);
        })
    }, [search, onResultsFetched]);

    return (
        <div className="search-bar">
                <button onClick={() => {setIsVisible(true)}}>
                    <img className="search-icon" src="/search-icon.svg" alt="search icon" width="25" height="25"/>
                </button>
                
                <input 
                    id="search-input" 
                    type="text" 
                    placeholder="Search..." 
                    className={`${isVisible ? '' : 'hidden'}`}
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                />
            </div>
);
};