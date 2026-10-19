import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

export default function ContactForm({ isOpen, onClose }) {
  const dialogRef = useRef(null)
  const formRef = useRef(null)
  const requestRef = useRef(null)
  const [status, setStatus] = useState('idle')

  useEffect(() => {
    if (!isOpen) return undefined
    const dialog = dialogRef.current
    const previousFocus = document.activeElement
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    if (!dialog.open) dialog.showModal()

    return () => {
      requestRef.current?.abort()
      requestRef.current = null
      dialog.close()
      document.body.style.overflow = previousOverflow
      if (previousFocus instanceof HTMLElement && previousFocus.isConnected) previousFocus.focus()
    }
  }, [isOpen])

  async function handleSubmit(event) {
    event.preventDefault()
    if (requestRef.current) return
    const form = formRef.current
    for (const [fieldName, minimum] of [['name', 2], ['message', 5]]) {
      const field = form.elements.namedItem(fieldName)
      field.value = field.value.trim()
      field.setCustomValidity(field.value.length >= minimum ? '' : `Введіть щонайменше ${minimum} символи.`)
    }
    const phone = form.elements.namedItem('phone')
    phone.value = phone.value.trim()
    const digitCount = phone.value.replace(/\D/g, '').length
    const validPhone = /^\+?[\d\s().-]+$/.test(phone.value) && digitCount >= 7 && digitCount <= 15
    phone.setCustomValidity(validPhone ? '' : 'Введіть від 7 до 15 цифр. Дозволено пробіли, дужки, крапки, дефіси та + на початку.')
    if (!form.reportValidity()) return
    const controller = new AbortController()
    let timedOut = false
    const timeout = window.setTimeout(() => {
      timedOut = true
      controller.abort()
    }, 15000)
    requestRef.current = controller
    setStatus('sending')

    try {
      const response = await fetch('https://formspree.io/f/xppqelqw', {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
        signal: controller.signal,
      })
      const result = await response.json().catch(() => null)
      if (!response.ok || result?.ok === false) throw new Error('Не вдалося надіслати повідомлення')
      if (!controller.signal.aborted) {
        setStatus('success')
        form.reset()
      }
    } catch (error) {
      if (requestRef.current === controller && (timedOut || error.name !== 'AbortError')) setStatus('error')
    } finally {
      window.clearTimeout(timeout)
      if (requestRef.current === controller) requestRef.current = null
    }
  }

  function handleBackdropClick(event) {
    if (event.target !== event.currentTarget) return
    const bounds = event.currentTarget.getBoundingClientRect()
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) handleClose()
  }

  function handleClose() {
    setStatus('idle')
    onClose()
  }

  function handleKeyDown(event) {
    if (event.key !== 'Tab') return
    const controls = [...event.currentTarget.querySelectorAll('button:not(:disabled), input:not(:disabled), textarea:not(:disabled), a[href], [tabindex="0"]')]
    const first = controls[0]
    const last = controls[controls.length - 1]
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault()
      last.focus()
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first.focus()
    }
  }

  const inputClass = 'mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-base text-[#142b45] outline-none focus:border-[#087f8c] focus:ring-2 focus:ring-[#087f8c]/25 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100'

  return createPortal(
    <dialog
      ref={dialogRef}
      id="react-contact-dialog"
      aria-labelledby="react-contact-title"
      aria-describedby="react-contact-description"
      className="fixed inset-0 m-auto max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-lg overflow-y-auto rounded-2xl border border-slate-200 bg-white p-6 text-[#142b45] shadow-2xl backdrop:bg-slate-950/65 sm:p-8 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
      onCancel={(event) => {
        event.preventDefault()
        handleClose()
      }}
      onClick={handleBackdropClick}
      onKeyDown={handleKeyDown}
    >
      <div className="flex items-start justify-between gap-5">
        <div>
          <p className="text-xs font-semibold tracking-[0.16em] text-[#087f8c] uppercase dark:text-teal-300">Залишаймося на зв’язку</p>
          <h2 id="react-contact-title" className="mt-3 text-2xl font-bold">Зворотний зв’язок</h2>
        </div>
        <button type="button" onClick={handleClose} aria-label="Закрити форму" className="flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-lg text-2xl text-slate-500 hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#087f8c] dark:text-slate-300 dark:hover:bg-slate-800">
          <span aria-hidden="true">×</span>
        </button>
      </div>
      <p id="react-contact-description" className="mt-3 text-sm leading-relaxed text-slate-500 dark:text-slate-400">Маєте запитання або пропозицію співпраці? Напишіть мені. Усі поля обов’язкові.</p>
      <form ref={formRef} id="react-contact-form" action="https://formspree.io/f/xppqelqw" method="POST" onSubmit={handleSubmit} className="mt-6 space-y-4">
        <label htmlFor="react-contact-name" className="block text-sm font-medium">
          Ім’я
          <input id="react-contact-name" name="name" type="text" autoComplete="name" required minLength={2} maxLength={100} disabled={status === 'sending'} onInput={(event) => event.currentTarget.setCustomValidity('')} className={inputClass} />
        </label>
        <label htmlFor="react-contact-email" className="block text-sm font-medium">
          Email
          <input id="react-contact-email" name="email" type="email" autoComplete="email" required maxLength={254} disabled={status === 'sending'} className={inputClass} />
        </label>
        <label htmlFor="react-contact-phone" className="block text-sm font-medium">
          Телефон
          <input id="react-contact-phone" name="phone" type="tel" autoComplete="tel" inputMode="tel" required minLength={7} maxLength={30} disabled={status === 'sending'} title="Введіть від 7 до 15 цифр. Дозволено + на початку, пробіли та символи ( ) - ." placeholder="+380 67 123 45 67" onInput={(event) => event.currentTarget.setCustomValidity('')} className={inputClass} />
        </label>
        <label htmlFor="react-contact-message" className="block text-sm font-medium">
          Повідомлення
          <textarea id="react-contact-message" name="message" rows={4} required minLength={5} maxLength={5000} disabled={status === 'sending'} onInput={(event) => event.currentTarget.setCustomValidity('')} className={`${inputClass} resize-y`} />
        </label>
        <div aria-live="polite" aria-atomic="true">
          {status === 'sending' && <p role="status" className="text-sm text-slate-500 dark:text-slate-400">Надсилаю повідомлення…</p>}
          {status === 'success' && <p role="status" className="rounded-lg bg-teal-50 p-3 text-sm text-teal-900 dark:bg-teal-950 dark:text-teal-200">Дякую! Повідомлення надіслано.</p>}
          {status === 'error' && <p role="alert" className="rounded-lg bg-amber-50 p-3 text-sm text-amber-900 dark:bg-amber-950 dark:text-amber-200">Не вдалося надіслати повідомлення. Перевірте з’єднання та спробуйте ще раз. Введені дані збережено у формі.</p>}
        </div>
        <div className="flex flex-wrap gap-3 pt-1">
          <button type="submit" disabled={status === 'sending'} className="cursor-pointer rounded-lg bg-[#087f8c] px-5 py-3 text-sm font-semibold text-white hover:bg-[#066873] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#087f8c] disabled:cursor-wait disabled:opacity-60">
            {status === 'sending' ? 'Надсилання…' : 'Надіслати'}
          </button>
          <button type="button" onClick={handleClose} className="cursor-pointer rounded-lg border border-slate-300 px-5 py-3 text-sm font-semibold hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#087f8c] dark:border-slate-600 dark:hover:bg-slate-800">Закрити</button>
        </div>
      </form>
    </dialog>,
    document.body,
  )
}
