"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { InventoryItem } from "@/lib/supabase/products";
import { NavBar } from "./nav-bar";
import {SearchBar} from "../components/search-bar";
import { InventoryContainer } from "./inventory-container";
import { NudgeWrapper } from "./nudge";

export function Storefront({ items }: { items: InventoryItem[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [displayedItems, setDisplayedItems] = useState<InventoryItem[]>(items);
  
  const handleResultsFetched = (fetchedData: any[]) => {
    if (fetchedData.length === 0 && searchQuery.trim() === "") {
      setDisplayedItems(items);
    } else {
      setDisplayedItems(fetchedData);
    }
  }

  return (
    <div className="min-h-screen px-4 py-8 text-slate-900 sm:px-6 lg:px-8">
      <NavBar></NavBar>

      <div className="mx-auto flex max-w-6xl flex-col gap-8">

        <header className="p-6">
          <div className="letter-row">
            <NudgeWrapper>
                <img className="nudge-icon" src="/S.svg" alt="S" width="100" height="100"/>
            </NudgeWrapper>
            <NudgeWrapper>
                <img className="nudge-icon" src="/H.svg" alt="H" width="75" height="75"/>
            </NudgeWrapper>
            <NudgeWrapper>
                <img className="nudge-icon" src="/O.svg" alt="O" width="100" height="100"/>
            </NudgeWrapper>
            <NudgeWrapper>
                <img className="nudge-icon" src="/P.svg" alt="P" width="35" height="35"/>
            </NudgeWrapper>
          </div>

          <SearchBar onResultsFetched={handleResultsFetched}/>
        </header>

        <main>
          <InventoryContainer
            items={displayedItems}
            searchQuery={searchQuery}
            initialSelected="apparel"
          />
        </main>
      </div>
    </div>
  );
}
