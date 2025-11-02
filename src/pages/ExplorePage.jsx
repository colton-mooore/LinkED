import { useMemo, useState } from 'react';
import skills from '../../data/skills.json';
import states from '../../data/states.json';
import alignments from '../../data/alignments.json';
import AlignmentChart from '../components/AlignmentChart.jsx';
import DownloadMenu from '../components/DownloadMenu.jsx';

const sortOptions = [
  { id: 'desc', label: 'Highest score' },
  { id: 'asc', label: 'Lowest score' },
  { id: 'alpha', label: 'Alphabetical' },
];

export default function ExplorePage() {
  const [selectedSkillId, setSelectedSkillId] = useState(() => skills[0]?.id ?? '');
  const [selectedStateId, setSelectedStateId] = useState(() => states[0]?.id ?? '');
  const [sortOrder, setSortOrder] = useState('desc');

  const selectedSkill = useMemo(
    () => skills.find((skill) => skill.id === selectedSkillId),
    [selectedSkillId]
  );

  const selectedState = useMemo(
    () => states.find((state) => state.id === selectedStateId),
    [selectedStateId]
  );

  const standardsById = useMemo(() => {
    if (!selectedState) return {};
    return selectedState.standards.reduce((acc, standard) => {
      acc[standard.id] = standard;
      return acc;
    }, {});
  }, [selectedState]);

  const alignmentRows = useMemo(() => {
    const rows = (alignments[selectedStateId]?.[selectedSkillId] ?? []).map((item) => ({
      ...item,
      standardName: standardsById[item.standardId]?.name ?? item.standardId,
      description: standardsById[item.standardId]?.description ?? '',
    }));

    switch (sortOrder) {
      case 'asc':
        return [...rows].sort((a, b) => a.score - b.score);
      case 'alpha':
        return [...rows].sort((a, b) => a.standardName.localeCompare(b.standardName));
      default:
        return [...rows].sort((a, b) => b.score - a.score);
    }
  }, [selectedStateId, selectedSkillId, sortOrder, standardsById]);

  const summary = useMemo(() => {
    if (!alignmentRows.length) return null;
    const average = Math.round(
      alignmentRows.reduce((sum, row) => sum + row.score, 0) / alignmentRows.length
    );
    const sorted = [...alignmentRows].sort((a, b) => b.score - a.score);
    const strongest = sorted[0];
    const weakest = sorted[sorted.length - 1];
    return { average, strongest, weakest };
  }, [alignmentRows]);

  return (
    <div className="flex flex-col gap-10">
      <section className="grid gap-6 rounded-xl border border-slate-800 bg-slate-900/60 p-6 shadow-xl shadow-black/40 md:grid-cols-3">
        <div className="md:col-span-1">
          <h2 className="text-lg font-semibold text-white">Select a skill</h2>
          <p className="mt-1 text-sm text-slate-400">
            Choose one of the ten Future Ready Skills to explore how it appears in state standards.
          </p>
        </div>
        <div className="md:col-span-2 grid gap-4 sm:grid-cols-2">
          <label className="flex flex-col gap-2 text-sm">
            <span className="font-medium text-slate-200">Future Ready Skill</span>
            <select
              value={selectedSkillId}
              onChange={(event) => setSelectedSkillId(event.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-base text-white focus:border-brand focus:outline-none"
            >
              {skills.map((skill) => (
                <option key={skill.id} value={skill.id}>
                  {skill.name}
                </option>
              ))}
            </select>
            <span className="text-xs text-slate-400">{selectedSkill?.description}</span>
          </label>
          <label className="flex flex-col gap-2 text-sm">
            <span className="font-medium text-slate-200">State</span>
            <select
              value={selectedStateId}
              onChange={(event) => setSelectedStateId(event.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-base text-white focus:border-brand focus:outline-none"
            >
              {states.map((state) => (
                <option key={state.id} value={state.id}>
                  {state.name}
                </option>
              ))}
            </select>
            <span className="text-xs text-slate-400">
              {selectedState?.standards?.length ?? 0} standards mapped
            </span>
          </label>
        </div>
        <div className="md:col-span-3 flex flex-wrap items-center justify-between gap-4 border-t border-slate-800 pt-4">
          <label className="flex items-center gap-2 text-sm text-slate-300">
            <span>Sort by:</span>
            <select
              value={sortOrder}
              onChange={(event) => setSortOrder(event.target.value)}
              className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-1 text-sm text-white focus:border-brand focus:outline-none"
            >
              {sortOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
          <DownloadMenu
            data={alignmentRows}
            selectedSkill={selectedSkillId}
            selectedState={selectedStateId}
          />
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <h2 className="text-lg font-semibold text-white">
            Alignment strengths for {selectedState?.name} standards
          </h2>
          <p className="mt-1 text-sm text-slate-400">
            Scores represent how strongly the {selectedState?.name} standards connect to the
            {` ${selectedSkill?.name} `} skill, with 100 indicating the strongest alignment.
          </p>
          <div className="mt-6 rounded-xl border border-slate-800 bg-slate-900/40 p-4">
            <AlignmentChart data={alignmentRows} />
          </div>
        </div>
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
            <h3 className="text-base font-semibold text-white">Snapshot</h3>
            {summary ? (
              <dl className="mt-4 grid grid-cols-1 gap-4 text-sm text-slate-300">
                <div className="rounded-lg bg-slate-900/80 p-4">
                  <dt className="text-xs uppercase tracking-wide text-slate-500">Average alignment</dt>
                  <dd className="mt-1 text-2xl font-semibold text-white">{summary.average}</dd>
                </div>
                <div className="rounded-lg bg-slate-900/80 p-4">
                  <dt className="text-xs uppercase tracking-wide text-slate-500">Strongest standard</dt>
                  <dd className="mt-1 font-semibold text-white">{summary.strongest.standardName}</dd>
                  <dd className="text-xs text-slate-400">Score {summary.strongest.score}</dd>
                </div>
                <div className="rounded-lg bg-slate-900/80 p-4">
                  <dt className="text-xs uppercase tracking-wide text-slate-500">Growth opportunity</dt>
                  <dd className="mt-1 font-semibold text-white">{summary.weakest.standardName}</dd>
                  <dd className="text-xs text-slate-400">Score {summary.weakest.score}</dd>
                </div>
              </dl>
            ) : (
              <p className="mt-4 text-sm text-slate-400">
                Alignment data for this combination is coming soon. Try another skill or state.
              </p>
            )}
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-5">
            <h3 className="text-base font-semibold text-white">Standards overview</h3>
            <ul className="mt-4 space-y-4 text-sm text-slate-300">
              {selectedState?.standards?.map((standard) => (
                <li key={standard.id} className="rounded-lg border border-slate-800/60 bg-slate-900/60 p-4">
                  <h4 className="font-semibold text-white">{standard.name}</h4>
                  <p className="mt-2 text-xs text-slate-400">{standard.description}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
