import { Link, Routes, Route, NavLink } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import ExplorePage from './pages/ExplorePage.jsx';

const navLinkBase =
  'px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150';

const activeClasses = 'bg-brand text-white shadow-lg';
const inactiveClasses =
  'text-slate-200 hover:text-white hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand';

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950">
      <header className="border-b border-slate-800 bg-slate-900/60 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <Link to="/" className="flex items-center gap-2 text-xl font-semibold">
            <span className="rounded-md bg-brand/20 px-2 py-1 text-brand">Link</span>
            <span className="text-white">ED</span>
          </Link>
          <nav className="flex items-center gap-2">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `${navLinkBase} ${isActive ? activeClasses : inactiveClasses}`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/explore"
              className={({ isActive }) =>
                `${navLinkBase} ${isActive ? activeClasses : inactiveClasses}`
              }
            >
              Explore
            </NavLink>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-10">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/explore" element={<ExplorePage />} />
        </Routes>
      </main>
      <footer className="border-t border-slate-800 bg-slate-900/80">
        <div className="mx-auto max-w-6xl px-4 py-6 text-sm text-slate-400">
          Inspired by the Harvard Explore SEL project. Built with React, Vite, Tailwind, and D3.
        </div>
      </footer>
    </div>
  );
}
