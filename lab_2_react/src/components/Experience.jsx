export default function Experience() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-title"
      className="min-w-0 scroll-mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 dark:border-slate-700 dark:bg-slate-900"
    >
      <p className="mb-2 text-xs font-semibold tracking-[0.14em] text-[#087f8c] uppercase dark:text-teal-300">Практика та проєкти</p>
      <h2 id="experience-title" className="mb-6 text-2xl font-bold tracking-tight">Навчальний досвід</h2>
      <div className="space-y-5">
        <article className="rounded-xl border border-slate-200 p-5 transition-shadow hover:shadow-md sm:p-6 motion-reduce:transition-none dark:border-slate-700">
          <p className="mb-2 text-xs font-semibold text-[#087f8c] uppercase dark:text-teal-300">Стажування</p>
          <h3 className="mb-3 text-xl font-semibold">Стажування в Appexoft</h3>
          <p className="text-sm leading-7 text-slate-600 dark:text-slate-300">
            Разом із командою розробляв застосунок — аналог «Нової пошти».
          </p>
          <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
            Відповідав за авторизацію користувачів і роботу з access- та refresh-токенами
            для доступу до застосунку й оновлення сесії.
          </p>
          <ul aria-label="Напрями роботи на стажуванні" className="mt-5 flex flex-wrap gap-2">
            {['Авторизація', 'Access tokens', 'Refresh tokens'].map((skill) => (
              <li key={skill} className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                {skill}
              </li>
            ))}
          </ul>
        </article>
        <article className="rounded-xl border border-slate-200 p-5 transition-shadow hover:shadow-md sm:p-6 motion-reduce:transition-none dark:border-slate-700">
          <p className="mb-2 text-xs font-semibold text-[#087f8c] uppercase dark:text-teal-300">Навчальний проєкт</p>
          <h3 className="mb-3 text-xl font-semibold">Вебрезюме</h3>
          <p className="text-sm leading-7 text-slate-600 dark:text-slate-300">
            Адаптивне резюме у двох версіях: HTML із CSS та React із Tailwind CSS.
            Структуровані розділи освіти й досвіду та зручна навігація.
          </p>
          <ul aria-label="Технології вебрезюме" className="mt-5 flex flex-wrap gap-2">
            {['HTML / CSS', 'React', 'Tailwind CSS'].map((technology) => (
              <li key={technology} className="rounded-full bg-teal-50 px-3 py-1.5 text-xs font-medium text-[#087f8c] dark:bg-teal-950 dark:text-teal-200">
                {technology}
              </li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  )
}
