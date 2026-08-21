export default function ResultCard({ accent, icon, title, value }) {
  return (
    <article className="group relative overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-[0_20px_50px_-38px_rgba(15,23,42,0.45)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_50px_-30px_rgba(15,23,42,0.24)]">
      <div
        className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${accent} opacity-70 transition duration-300 group-hover:opacity-100`}
      />
      <div className="relative">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-xl text-white shadow-[0_14px_30px_-18px_rgba(15,23,42,0.7)]">
            <span>{icon}</span>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
              {title}
            </p>
          </div>
        </div>

        <p className="text-sm leading-7 text-slate-700">{value}</p>
      </div>
    </article>
  );
}
