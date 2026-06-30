import { useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

export default function QRGenerator({ onGenerate, initialValue }) {
  const { t } = useTranslation()
  const [text, setText] = useState(initialValue || '')
  const [error, setError] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    const trimmed = text.trim()
    if (!trimmed) {
      setError(true)
      setTimeout(() => setError(false), 500)
      return
    }
    onGenerate(trimmed)
  }

  const handlePaste = async () => {
    try {
      const clipText = await navigator.clipboard.readText()
      if (clipText) {
        setText(clipText)
        onGenerate(clipText.trim())
      }
    } catch {
      // Clipboard access denied
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass rounded-2xl p-6 sm:p-8"
    >
      <h2 className="text-xl font-bold text-white mb-5">{t('generator.title')}</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
            </svg>
          </div>
          <motion.input
            type="text"
            value={text}
            onChange={(e) => { setText(e.target.value); setError(false) }}
            placeholder={t('generator.placeholder')}
            className={`w-full bg-white/5 border rounded-xl px-11 py-3.5 text-white placeholder-white/30 outline-none transition-all ${
              error
                ? 'border-red-500/50 ring-2 ring-red-500/20'
                : 'border-white/10 focus:border-blue-400/50 focus:ring-2 focus:ring-blue-400/20'
            }`}
            animate={error ? { x: [0, -8, 8, -6, 6, -3, 3, 0] } : {}}
            transition={{ duration: 0.4 }}
          />
          {text && (
            <button
              type="button"
              onClick={() => setText('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          )}
        </div>

        <div className="flex gap-3">
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium py-3 px-6 rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-shadow"
          >
            {t('generator.button')}
          </motion.button>

          <motion.button
            type="button"
            onClick={handlePaste}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white/5 hover:bg-white/10 text-white/60 hover:text-white/90 px-4 py-3 rounded-xl transition-all border border-white/10"
            title="Paste"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="8" y="2" width="8" height="4" rx="1" />
              <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
            </svg>
          </motion.button>
        </div>
      </form>
    </motion.div>
  )
}
