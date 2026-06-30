import { useState, useCallback, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import './i18n'
import Header from './components/Header'
import QRGenerator from './components/QRGenerator'
import QRPreview from './components/QRPreview'
import Customizer from './components/Customizer'
import History from './components/History'
import { useLocalStorage } from './hooks/useLocalStorage'

const DEFAULT_FG = '#000000'
const DEFAULT_BG = '#ffffff'
const DEFAULT_SIZE = 256
const DEFAULT_EC = 'M'

const colorSchemeMap = {
  purple: { fg: '#7c3aed', bg: '#faf5ff' },
  blue: { fg: '#2563eb', bg: '#eff6ff' },
  green: { fg: '#059669', bg: '#ecfdf5' },
  orange: { fg: '#ea580c', bg: '#fff7ed' },
}

export default function App() {
  const { i18n } = useTranslation()
  const [theme, setTheme] = useLocalStorage('qrflow-theme', 'dark')
  const [lang, setLang] = useLocalStorage('qrflow-lang', 'en')
  const [colorScheme, setColorScheme] = useLocalStorage('qrflow-scheme', 'purple')

  const [qrValue, setQrValue] = useState('')
  const [fgColor, setFgColor] = useState(colorSchemeMap[colorScheme].fg)
  const [bgColor, setBgColor] = useState(colorSchemeMap[colorScheme].bg)
  const [size, setSize] = useState(DEFAULT_SIZE)
  const [ecLevel, setEcLevel] = useState(DEFAULT_EC)
  const [logo, setLogo] = useState(null)
  const [history, setHistory] = useLocalStorage('qrflow-history', [])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    document.documentElement.classList.toggle('light', theme === 'light')
  }, [theme])

  useEffect(() => {
    i18n.changeLanguage(lang)
  }, [lang, i18n])

  useEffect(() => {
    if (colorSchemeMap[colorScheme]) {
      setFgColor(colorSchemeMap[colorScheme].fg)
      setBgColor(colorSchemeMap[colorScheme].bg)
    }
  }, [colorScheme])

  const handleGenerate = useCallback((text) => {
    setQrValue(text)
  }, [])

  const handleCustomizerChange = useCallback((key, value) => {
    const setters = {
      fgColor: setFgColor,
      bgColor: setBgColor,
      size: setSize,
      ecLevel: setEcLevel,
      logo: setLogo,
    }
    setters[key]?.(value)
  }, [])

  const handleHistorySelect = useCallback((item) => {
    setQrValue(item.value)
    setFgColor(item.fgColor || DEFAULT_FG)
    setBgColor(item.bgColor || DEFAULT_BG)
    setSize(item.size || DEFAULT_SIZE)
    setEcLevel(item.ecLevel || DEFAULT_EC)
  }, [])

  const handleHistoryDelete = useCallback((id) => {
    setHistory((prev) => prev.filter((item) => item.id !== id))
  }, [setHistory])

  const handleHistoryClear = useCallback(() => {
    setHistory([])
  }, [setHistory])

  const handleThemeToggle = useCallback(() => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }, [setTheme])

  const handleLangChange = useCallback((code) => {
    setLang(code)
    i18n.changeLanguage(code)
  }, [setLang, i18n])

  const handleColorSchemeChange = useCallback((scheme) => {
    setColorScheme(scheme)
  }, [setColorScheme])

  useEffect(() => {
    if (qrValue) {
      const item = {
        id: Date.now().toString(),
        value: qrValue,
        fgColor,
        bgColor,
        size,
        ecLevel,
        createdAt: Date.now(),
      }
      setHistory((prev) => {
        const filtered = prev.filter((h) => h.value !== qrValue)
        return [item, ...filtered].slice(0, 20)
      })
    }
  }, [qrValue])

  return (
    <div className={`min-h-screen transition-colors duration-300 ${theme === 'dark' ? 'bg-[#0a0a0f] text-white' : 'bg-[#f5f5fa] text-gray-900'}`}>
      <Header
        lang={lang}
        onLangChange={handleLangChange}
        theme={theme}
        onThemeChange={handleThemeToggle}
        colorScheme={colorScheme}
        onColorSchemeChange={handleColorSchemeChange}
      />

      <main className="pt-24 pb-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-medium mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
              Free & Open Source
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold gradient-text leading-tight">
              QRFlow
            </h1>
            <p className={`mt-3 text-lg ${theme === 'dark' ? 'text-white/50' : 'text-gray-500'}`}>
              {i18n.t('app.tagline')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <QRGenerator onGenerate={handleGenerate} initialValue={qrValue} />
              <AnimatePresence mode="wait">
                {qrValue && (
                  <motion.div
                    key="preview"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <QRPreview
                      value={qrValue}
                      fgColor={fgColor}
                      bgColor={bgColor}
                      size={size}
                      logo={logo}
                      ecLevel={ecLevel}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="space-y-6">
              <Customizer
                fgColor={fgColor}
                bgColor={bgColor}
                size={size}
                ecLevel={ecLevel}
                logo={logo}
                onChange={handleCustomizerChange}
              />
              <History
                items={history}
                onSelect={handleHistorySelect}
                onDelete={handleHistoryDelete}
                onClear={handleHistoryClear}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
