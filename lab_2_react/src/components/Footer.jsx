import { useEffect, useState } from 'react'

function collectBrowserInfo() {
  return {
    userAgent: navigator.userAgent,
    platform: navigator.platform,
    language: navigator.language,
    languages: [...navigator.languages],
    cookieEnabled: navigator.cookieEnabled,
    onLine: navigator.onLine,
    hardwareConcurrency: navigator.hardwareConcurrency ?? 'Недоступно',
    deviceMemory: navigator.deviceMemory ?? 'Недоступно',
    maxTouchPoints: navigator.maxTouchPoints,
    screen: {
      width: window.screen.width,
      height: window.screen.height,
      colorDepth: window.screen.colorDepth,
      pixelRatio: window.devicePixelRatio,
    },
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  }
}

function formatStorageValue(value) {
  try {
    return JSON.stringify(JSON.parse(value), null, 2)
  } catch {
    return value
  }
}

export default function Footer({ onContactOpen }) {
  const [entries, setEntries] = useState([])
  const [storageError, setStorageError] = useState('')

  useEffect(() => {
    let saveError = ''
    const refreshStorage = () => {
      try {
        const storage = window.localStorage
        const values = []
        for (let index = 0; index < storage.length; index += 1) {
          const key = storage.key(index)
          if (key !== null) values.push([key, formatStorageValue(storage.getItem(key))])
        }
        setEntries(values)
        setStorageError(saveError)
      } catch {
        setEntries([])
        setStorageError('Не вдалося прочитати локальне сховище. Перевірте дозволи браузера.')
      }
    }

    const saveBrowserInfo = () => {
      try {
        window.localStorage.setItem('resume-system-info', JSON.stringify(collectBrowserInfo()))
        saveError = ''
      } catch {
        saveError = 'Не вдалося зберегти інформацію про систему. Перевірте дозволи браузера та вільне місце у сховищі.'
      }
      refreshStorage()
    }

    saveBrowserInfo()
    window.addEventListener('storage', refreshStorage)
    window.addEventListener('resume-storage-change', refreshStorage)
    window.addEventListener('online', saveBrowserInfo)
    window.addEventListener('offline', saveBrowserInfo)
    return () => {
      window.removeEventListener('storage', refreshStorage)
      window.removeEventListener('resume-storage-change', refreshStorage)
      window.removeEventListener('online', saveBrowserInfo)
      window.removeEventListener('offline', saveBrowserInfo)
    }
  }, [])

  const linkClass = 'rounded-sm font-medium text-[#087f8c] underline-offset-4 transition-colors hover:text-[#142b45] hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#087f8c] motion-reduce:transition-none dark:text-teal-300 dark:hover:text-white'

  return (
    <footer className="mx-auto max-w-[1120px] px-5 pb-8 sm:px-8">
      <div className="flex flex-col gap-4 border-t border-slate-200 pt-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between dark:border-slate-700 dark:text-slate-400">
        <p>Маркіян Задерецький · Львів</p>
        <div className="flex flex-wrap gap-x-6 gap-y-3">
          <button type="button" onClick={onContactOpen} className={`${linkClass} cursor-pointer`}>
            Зворотний зв’язок
          </button>
          <a href="https://github.com/Markiian-cmd" className={linkClass}>
            Мій профіль GitHub
          </a>
          <a href="#top" className={linkClass}>
            Нагору <span aria-hidden="true">↑</span>
          </a>
        </div>
      </div>
      <details id="react-system-info" className="mt-6 rounded-xl border border-slate-200 bg-white p-5 text-sm dark:border-slate-700 dark:bg-slate-900">
        <summary className="cursor-pointer rounded-sm font-semibold text-[#142b45] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#087f8c] dark:text-slate-100">
          Інформація про систему та локальне сховище
        </summary>
        <p className="mt-3 leading-relaxed text-slate-500 dark:text-slate-400">
          {storageError ? 'Доступні записи локального сховища для цієї сторінки.' : 'Доступні відомості про браузер і пристрій збережено в цьому браузері. Нижче показано всі записи локального сховища для цієї сторінки.'}
        </p>
        {storageError && (
          <p role="status" className="mt-4 text-amber-800 dark:text-amber-300">{storageError}</p>
        )}
        {entries.length > 0 && (
          <dl className="mt-4 space-y-4">
            {entries.map(([key, value]) => (
              <div key={key} className="min-w-0">
                <dt className="mb-2 font-semibold break-all text-[#087f8c] dark:text-teal-300">{key}</dt>
                <dd>
                  <pre className="overflow-x-auto rounded-lg bg-slate-50 p-4 text-xs leading-relaxed whitespace-pre-wrap break-all text-slate-600 dark:bg-slate-800 dark:text-slate-300">{value}</pre>
                </dd>
              </div>
            ))}
          </dl>
        )}
      </details>
    </footer>
  )
}
