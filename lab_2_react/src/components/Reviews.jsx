import { useEffect, useState } from 'react'

export default function Reviews() {
  const [reviews, setReviews] = useState([])
  const [status, setStatus] = useState('loading')
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    const controller = new AbortController()
    let active = true

    async function loadReviews() {
      setStatus('loading')
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts/7/comments', {
          signal: controller.signal,
        })
        if (!response.ok) throw new Error('Не вдалося завантажити відгуки')
        const data = await response.json()
        if (!Array.isArray(data) || data.some((review) => (
          !review || !Number.isInteger(review.id) || typeof review.name !== 'string'
          || typeof review.email !== 'string' || typeof review.body !== 'string'
        ))) throw new Error('Некоректна відповідь сервера')
        if (active) {
          setReviews(data)
          setStatus('success')
        }
      } catch (error) {
        if (active && error.name !== 'AbortError') setStatus('error')
      }
    }

    loadReviews()
    return () => {
      active = false
      controller.abort()
    }
  }, [attempt])

  return (
    <section id="reviews" aria-labelledby="reviews-heading" className="min-w-0 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 min-[900px]:col-span-2 dark:border-slate-700 dark:bg-slate-900">
      <p className="text-xs font-semibold tracking-[0.16em] text-[#087f8c] uppercase dark:text-teal-300">Враження та співпраця</p>
      <h2 id="reviews-heading" className="mt-3 text-2xl font-bold tracking-tight text-[#142b45] dark:text-slate-100">Відгуки роботодавців</h2>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-500 dark:text-slate-400">
        Демонстраційні відгуки з JSONPlaceholder для навчального завдання, варіант 7.
      </p>
      <div className="mt-6" aria-busy={status === 'loading'} aria-live="polite">
        {status === 'loading' && <p role="status" className="text-slate-500 dark:text-slate-400">Завантажую відгуки…</p>}
        {status === 'error' && (
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-5 dark:border-amber-700 dark:bg-amber-950/40">
            <p role="alert" className="text-sm text-amber-900 dark:text-amber-200">Не вдалося завантажити відгуки. Перевірте з’єднання та спробуйте ще раз.</p>
            <button id="react-reviews-retry" type="button" onClick={() => setAttempt((value) => value + 1)} className="mt-4 cursor-pointer rounded-lg bg-[#087f8c] px-4 py-2 text-sm font-semibold text-white hover:bg-[#066873] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#087f8c]">
              Спробувати ще раз
            </button>
          </div>
        )}
        {status === 'success' && (reviews.length ? (
          <div className="grid gap-4 sm:grid-cols-2">
            {reviews.map((review) => (
              <article key={review.id} className="min-w-0 rounded-xl border border-slate-200 bg-slate-50/60 p-5 dark:border-slate-700 dark:bg-slate-800/50">
                <h3 className="font-semibold break-words text-[#142b45] dark:text-slate-100">{review.name}</h3>
                <p className="mt-2 text-xs break-all text-[#087f8c] dark:text-teal-300">{review.email}</p>
                <p className="mt-4 text-sm leading-relaxed whitespace-pre-line break-words text-slate-600 dark:text-slate-300">{review.body}</p>
              </article>
            ))}
          </div>
        ) : <p className="text-slate-500 dark:text-slate-400">Відгуків поки немає.</p>)}
      </div>
    </section>
  )
}
