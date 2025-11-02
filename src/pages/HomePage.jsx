import { Link } from 'react-router-dom';
import SkillHighlights from '../components/SkillHighlights.jsx';

export default function HomePage() {
  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-16 text-center">
      <section className="flex flex-col gap-8">
        <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          Discover how Future Ready Skills align with every state standard.
        </h1>
        <p className="mx-auto max-w-3xl text-lg text-slate-300">
          LinkED helps educators, researchers, and advocates explore how ten Future Ready Skills map onto learning standards
          across the United States. Select a skill, choose a state, and uncover opportunities to support students.
        </p>
        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            to="/explore"
            className="rounded-lg bg-brand px-6 py-3 text-base font-semibold text-white shadow-lg shadow-brand/40 transition hover:bg-brand-light"
          >
            Start exploring
          </Link>
          <a
            href="http://exploresel.gse.harvard.edu/compare-frameworks/"
            target="_blank"
            rel="noreferrer"
            className="rounded-lg border border-slate-700 px-6 py-3 text-base font-semibold text-slate-200 transition hover:border-brand hover:text-white"
          >
            View inspiration
          </a>
        </div>
      </section>

      <section className="grid gap-6 rounded-2xl border border-slate-800 bg-slate-900/50 p-8 text-left shadow-xl shadow-black/20 sm:grid-cols-2">
        <article className="space-y-3">
          <h2 className="text-xl font-semibold text-white">Interactive comparisons</h2>
          <p className="text-sm leading-relaxed text-slate-300">
            Choose any skill and state to view how their standards align. Sort the list, scan quick statistics, and export the
            alignment set for deeper analysis.
          </p>
        </article>
        <article className="space-y-3">
          <h2 className="text-xl font-semibold text-white">Ready for your data</h2>
          <p className="text-sm leading-relaxed text-slate-300">
            Replace the JSON files in the <code>data/</code> directory with your own skills, standards, and scores to tailor the
            experience to your framework.
          </p>
        </article>
      </section>

      <SkillHighlights />
    </div>
  );
}
