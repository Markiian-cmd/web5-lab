export default function Education() {
  return (
    <section
      id="education"
      aria-labelledby="education-title"
      className="min-w-0 scroll-mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 dark:border-slate-700 dark:bg-slate-900"
    >
      <p className="mb-2 text-xs font-semibold tracking-[0.14em] text-[#087f8c] uppercase dark:text-teal-300">Навчання</p>
      <h2 id="education-title" className="mb-6 text-2xl font-bold tracking-tight">Освіта</h2>
      <h3 className="border-l-4 border-[#087f8c] pl-4 text-lg leading-relaxed font-semibold dark:border-teal-300">
        Національний університет «Львівська політехніка»
      </h3>
      <ul className="mt-6 space-y-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
        <li className="border-b border-slate-100 pb-4 dark:border-slate-700">
          <span className="mb-1 block text-xs font-medium tracking-wide text-slate-500 uppercase dark:text-slate-400">Спеціальність</span>
          <span className="font-medium text-[#142b45] dark:text-slate-100">F5 «Кібербезпека»</span>
        </li>
        <li className="border-b border-slate-100 pb-4 dark:border-slate-700">
          <span className="mb-1 block text-xs font-medium tracking-wide text-slate-500 uppercase dark:text-slate-400">Кафедра</span>
          Захисту інформації
        </li>
        <li className="border-b border-slate-100 pb-4 dark:border-slate-700">
          <span className="mb-1 block text-xs font-medium tracking-wide text-slate-500 uppercase dark:text-slate-400">Група</span>
          <span className="inline-block rounded-md bg-teal-50 px-3 py-1 font-bold text-[#087f8c] dark:bg-teal-950 dark:text-teal-200">КБ-201</span>
        </li>
        <li>
          <span className="mb-1 block text-xs font-medium tracking-wide text-slate-500 uppercase dark:text-slate-400">Місто</span>
          Львів
        </li>
      </ul>
    </section>
  )
}
