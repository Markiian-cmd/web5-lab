export default function Header({ name }) {
  return (
    <header id="top" className="bg-[#142b45] text-white">
      <div className="mx-auto max-w-[1120px] px-5 pt-10 pb-6 sm:px-8 sm:pt-14">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-8">
          <span
            aria-hidden="true"
            className="flex size-20 shrink-0 items-center justify-center rounded-2xl border border-white/20 bg-white/10 text-3xl font-semibold tracking-wider sm:size-24"
          >
            МЗ
          </span>
          <div className="min-w-0">
            <p className="mb-3 text-xs font-semibold tracking-[0.16em] text-teal-200 sm:text-sm">
              КІБЕРБЕЗПЕКА · КБ-201
            </p>
            <h1 className="text-4xl leading-tight font-bold tracking-tight sm:text-5xl lg:text-6xl">
              {name}
            </h1>
            <p className="mt-4 text-base leading-relaxed text-slate-200 sm:text-lg">
              Студент спеціальності F5 «Кібербезпека»
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm">
              <span className="rounded-full border border-white/20 px-3 py-1 text-slate-200">
                Львів, Україна
              </span>
              <a
                href="https://github.com/Markiian-cmd"
                className="rounded-sm font-semibold text-teal-200 underline-offset-4 transition-colors hover:text-white hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-200 motion-reduce:transition-none"
              >
                Профіль GitHub <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </div>
        <nav aria-label="Розділи резюме" className="mt-8 flex flex-wrap gap-3 border-t border-white/15 pt-5">
          <a
            href="#education"
            className="rounded-lg px-4 py-2 text-sm font-medium text-slate-200 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-200 motion-reduce:transition-none"
          >
            Освіта
          </a>
          <a
            href="#experience"
            className="rounded-lg px-4 py-2 text-sm font-medium text-slate-200 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-200 motion-reduce:transition-none"
          >
            Досвід
          </a>
        </nav>
      </div>
    </header>
  )
}
