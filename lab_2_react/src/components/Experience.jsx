export default function Experience() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-title"
      className="min-w-0 scroll-mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
    >
      <p className="mb-2 text-xs font-semibold tracking-[0.14em] text-[#087f8c] uppercase">Практика та проєкти</p>
      <h2 id="experience-title" className="mb-6 text-2xl font-bold tracking-tight">Навчальний досвід</h2>
      <div className="space-y-5">
        <article className="rounded-xl border border-slate-200 p-5 transition-shadow hover:shadow-md sm:p-6 motion-reduce:transition-none">
          <p className="mb-2 text-xs font-semibold text-[#087f8c] uppercase">Стажування</p>
          <h3 className="mb-3 text-xl font-semibold">Стажування в Appexoft</h3>
          <p className="text-sm leading-7 text-slate-600">
            Разом із командою розробляв застосунок — аналог «Нової пошти».
          </p>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            Відповідав за авторизацію користувачів і роботу з access- та refresh-токенами
            для доступу до застосунку й оновлення сесії.
          </p>
          <ul aria-label="Напрями роботи на стажуванні" className="mt-5 flex flex-wrap gap-2">
            {['Авторизація', 'Access tokens', 'Refresh tokens'].map((skill) => (
              <li key={skill} className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600">
                {skill}
              </li>
            ))}
          </ul>
        </article>
        <article className="rounded-xl border border-slate-200 p-5 transition-shadow hover:shadow-md sm:p-6 motion-reduce:transition-none">
          <p className="mb-2 text-xs font-semibold text-[#087f8c] uppercase">Навчальний проєкт</p>
          <h3 className="mb-3 text-xl font-semibold">Вебрезюме</h3>
          <p className="text-sm leading-7 text-slate-600">
            Адаптивне резюме у двох версіях: HTML із CSS та React із Tailwind CSS.
            Структуровані розділи освіти й досвіду та зручна навігація.
          </p>
          <ul aria-label="Технології вебрезюме" className="mt-5 flex flex-wrap gap-2">
            {['HTML / CSS', 'React', 'Tailwind CSS'].map((technology) => (
              <li key={technology} className="rounded-full bg-teal-50 px-3 py-1.5 text-xs font-medium text-[#087f8c]">
                {technology}
              </li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  )
}
