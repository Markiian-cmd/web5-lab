export default function Footer() {
  return (
    <footer className="mx-auto max-w-[1120px] px-5 pb-8 sm:px-8">
      <div className="flex flex-col gap-4 border-t border-slate-200 pt-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
        <p>Маркіян Задерецький · Львів</p>
        <div className="flex flex-wrap gap-x-6 gap-y-3">
          <a
            href="https://github.com/Markiian-cmd"
            className="rounded-sm font-medium text-[#087f8c] underline-offset-4 transition-colors hover:text-[#142b45] hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#087f8c] motion-reduce:transition-none"
          >
            Мій профіль GitHub
          </a>
          <a
            href="#top"
            className="rounded-sm font-medium text-[#087f8c] underline-offset-4 transition-colors hover:text-[#142b45] hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#087f8c] motion-reduce:transition-none"
          >
            Нагору <span aria-hidden="true">↑</span>
          </a>
        </div>
      </div>
    </footer>
  )
}
