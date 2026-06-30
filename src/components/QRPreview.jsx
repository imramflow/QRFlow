import { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { toPng, toSvg } from 'html-to-image'

import { QRCodeSVG } from 'qrcode.react'

export default function QRPreview({ value, fgColor, bgColor, size, logo, ecLevel }) {
  const { t } = useTranslation()
  const qrRef = useRef(null)
  const [downloading, setDownloading] = useState(null)

  const handleDownload = async (format) => {
    if (!qrRef.current) return
    setDownloading(format)
    try {
      const fileName = `qrflow-${Date.now()}`
      if (format === 'png') {
        const dataUrl = await toPng(qrRef.current, { backgroundColor: bgColor })
        const link = document.createElement('a')
        link.download = `${fileName}.png`
        link.href = dataUrl
        link.click()
      } else {
        const dataUrl = await toSvg(qrRef.current)
        const link = document.createElement('a')
        link.download = `${fileName}.svg`
        link.href = dataUrl
        link.click()
      }
    } catch {
      // Download failed silently
    }
    setTimeout(() => setDownloading(null), 1000)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="glass rounded-2xl p-6 sm:p-8"
    >
      <h2 className="text-xl font-bold text-white mb-5">{t('preview.title')}</h2>

      <AnimatePresence mode="wait">
        {value ? (
          <motion.div
            key={value}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className="flex flex-col items-center gap-6"
          >
            <div
              ref={qrRef}
              className="relative rounded-xl overflow-hidden p-4"
              style={{ backgroundColor: bgColor }}
            >
              <QRCodeSVG
                value={value}
                size={size}
                fgColor={fgColor}
                bgColor="transparent"
                level={ecLevel}
                includeMargin
              />
              {logo && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg overflow-hidden bg-white p-1 shadow-lg">
                    <img src={logo} alt="logo" className="w-full h-full object-contain rounded" />
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-3 flex-wrap justify-center">
              <motion.button
                onClick={() => handleDownload('png')}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={downloading === 'png'}
                className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-5 py-2.5 rounded-xl font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-shadow disabled:opacity-50"
              >
                {downloading === 'png' ? (
                  <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="31.4 31.4" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                )}
                {t('preview.downloadPNG')}
              </motion.button>

              <motion.button
                onClick={() => handleDownload('svg')}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={downloading === 'svg'}
                className="flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white/80 px-5 py-2.5 rounded-xl font-medium border border-white/10 transition-all disabled:opacity-50"
              >
                {downloading === 'svg' ? (
                  <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="31.4 31.4" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                )}
                {t('preview.downloadSVG')}
              </motion.button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center gap-4 py-12"
          >
            <div className="w-20 h-20 rounded-2xl bg-white/5 flex items-center justify-center shimmer">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white/20">
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
              </svg>
            </div>
            <p className="text-white/40 text-sm">{t('preview.noContent')}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
