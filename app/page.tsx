import Link from "next/link";
import {NavBar} from '../components/nav-bar';

export default function Home() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.82),_transparent_50%)] px-4 py-10 text-slate-900 sm:px-6 lg:px-8">
      <section className="mx-auto flex max-w-6xl flex-col gap-8 rounded-[2rem] border border-white/70 bg-white/80 p-8 shadow-xl shadow-slate-900/10 backdrop-blur lg:p-12">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl space-y-4">
            <NavBar></NavBar>
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-pink-600">
              Wracket Studio
            </p>
            <h1 className="text-4xl font-semibold sm:text-5xl">
              For everyday art lovers
            </h1>
            <p className="text-lg text-slate-700">
              The legacy HTML and web component experience has been translated into Next.js routes, and the catalog is connected to Supabase-ready product data.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/shop"
              className="rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
            >
              Open the shop
            </Link>
            <a
              href="https://vercel.com"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Deploy to Vercel
            </a>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-[1.25rem] border border-slate-200 bg-slate-50 p-5">
            <h2 className="font-semibold">Next.js routing</h2>
            <p className="mt-2 text-sm text-slate-600">Shop and product detail pages now live as real routes instead of static HTML files.</p>
          </div>
          <div className="rounded-[1.25rem] border border-slate-200 bg-slate-50 p-5">
            <h2 className="font-semibold">Supabase ready</h2>
            <p className="mt-2 text-sm text-slate-600">The product layer reads from Supabase when configured and falls back to sample catalog data otherwise.</p>
          </div>
          <div className="rounded-[1.25rem] border border-slate-200 bg-slate-50 p-5">
            <h2 className="font-semibold">Vercel friendly</h2>
            <p className="mt-2 text-sm text-slate-600">The project is structured for a straightforward production deployment with environment variables.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
