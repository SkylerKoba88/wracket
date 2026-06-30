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
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.8),_transparent_55%)] px-4 py-8 text-slate-900 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-8">

        <header className="rounded-[2rem] border border-white/70 bg-white/80 p-6 shadow-xl shadow-slate-900/10 backdrop-blur">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl space-y-3">
              <NavBar></NavBar>
              <NudgeWrapper>
                  <img className="nudge-icon" src="/S.svg" alt="S" width="100" height="100"/>
              </NudgeWrapper>
              <NudgeWrapper>
                  <img className="nudge-icon" src="/H.svg" alt="H" width="100" height="100"/>
              </NudgeWrapper>
              <NudgeWrapper>
                  <img className="nudge-icon" src="/O.svg" alt="O" width="100" height="100"/>
              </NudgeWrapper>
              <NudgeWrapper>
                  <img className="nudge-icon" src="/P.svg" alt="P" width="50" height="50"/>
              </NudgeWrapper>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <SearchBar onResultsFetched={handleResultsFetched}/>
          </div>

        </header>

        <main className="space-y-6">
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
