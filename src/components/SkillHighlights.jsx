import skills from '../../data/skills.json';

const highlightedSkills = skills.slice(0, 3);

export default function SkillHighlights() {
  return (
    <section className="mt-16 grid gap-6 rounded-2xl border border-slate-800 bg-slate-900/60 p-8 shadow-xl shadow-black/30 sm:grid-cols-3">
      {highlightedSkills.map((skill) => (
        <article key={skill.id} className="flex flex-col gap-3">
          <h3 className="text-lg font-semibold text-white">{skill.name}</h3>
          <p className="text-sm leading-relaxed text-slate-300">{skill.description}</p>
          <p className="mt-auto text-xs uppercase tracking-wide text-slate-500">
            Explore how this skill appears in different standards.
          </p>
        </article>
      ))}
    </section>
  );
}
