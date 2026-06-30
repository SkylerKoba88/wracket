import Link from "next/link";
import {NavBar} from '../components/nav-bar';
import { NudgeWrapper } from "@/components/nudge";

export default function Home() {
  return (
    <main className="min-h-screen px-4 py-10 text-slate-900 sm:px-6 lg:px-8">
      <NavBar></NavBar>
      <section className="wracket-container">
            
            <div className="letter-row">
              <NudgeWrapper>
                  <img className="nudge-icon" src="/W.svg" alt="W" width="100" height="100"/>
              </NudgeWrapper>
              <NudgeWrapper>
                  <img className="nudge-icon" src="/R.svg" alt="R" width="100" height="100"/>
              </NudgeWrapper>
              <NudgeWrapper>
                  <img className="nudge-icon" src="/A.svg" alt="A" width="100" height="100"/>
              </NudgeWrapper>
              <NudgeWrapper>
                  <img className="nudge-icon" src="/C.svg" alt="C" width="100" height="100"/>
              </NudgeWrapper>
              <NudgeWrapper>
                  <img className="nudge-icon" src="/K.svg" alt="K" width="100" height="100"/>
              </NudgeWrapper>
              <NudgeWrapper>
                  <img className="nudge-icon" src="/E.svg" alt="E" width="100" height="100"/>
              </NudgeWrapper>
              <NudgeWrapper>
                  <img className="nudge-icon" src="/T.svg" alt="T" width="50" height="50"/>
              </NudgeWrapper>
            </div>
            <p className="text-sm font-semibold uppercase tracking-[0.35em]">
              Studio
            </p>
            <h2>
              For everyday art lovers
            </h2>
        </section>
    </main>
  );
}
