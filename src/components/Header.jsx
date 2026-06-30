import { motion } from 'framer-motion'

const languages = [
  { code: 'en', label: 'EN', dir: 'ltr' },
  { code: 'fr', label: 'FR', dir: 'ltr' },
  { code: 'ar', label: 'AR', dir: 'rtl' },
]

const colorSchemes = [
  { name: 'purple', from: 'from-purple-400', to: 'to-pink-500' },
  { name: 'blue', from: 'from-blue-400', to: 'to-cyan-500' },
  { name: 'green', from: 'from-green-400', to: 'to-emerald-500' },
  { name: 'orange', from: 'from-orange-400', to: 'to-red-500' },
]

export default function Header({ lang, onLangChange, theme, onThemeChange, colorScheme, onColorSchemeChange }) {
  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 80, damping: 20 }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div className="glass border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <motion.div
            className="flex items-center gap-3"
            whileHover={{ scale: 1.02 }}
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
              </svg>
            </div>
            <span className="text-lg font-bold text-white">QRFlow</span>
          </motion.div>

          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex gap-1 bg-white/5 rounded-lg p-1">
              {colorSchemes.map((scheme) => (
                <button
                  key={scheme.name}
                  onClick={() => onColorSchemeChange(scheme.name)}
                  className={`w-6 h-6 rounded-md bg-gradient-to-br ${scheme.from} ${scheme.to} transition-all ${
                    colorScheme === scheme.name ? 'ring-2 ring-white/60 scale-110' : 'opacity-60 hover:opacity-100'
                  }`}
                />
              ))}
            </div>

            <div className="flex gap-1 bg-white/5 rounded-lg p-1">
              {languages.map((l) => (
                <button
                  key={l.code}
                  onClick={() => onLangChange(l.code)}
                  className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
                    lang === l.code
                      ? 'bg-white/10 text-white'
                      : 'text-white/40 hover:text-white/70'
                  }`}
                >
                  {l.label}
                </button>
              ))}
            </div>

            <button
              onClick={onThemeChange}
              className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
            >
              {theme === 'dark' ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-400">
                  <circle cx="12" cy="12" r="5" />
                  <line x1="12" y1="1" x2="12" y2="3" />
                  <line x1="12" y1="21" x2="12" y2="23" />
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                  <line x1="1" y1="12" x2="3" y2="12" />
                  <line x1="21" y1="12" x2="23" y2="12" />
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </motion.header>
  )
}
