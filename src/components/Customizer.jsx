import { useRef } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

const ecOptions = ['L', 'M', 'Q', 'H']

export default function Customizer({ fgColor, bgColor, size, ecLevel, logo, onChange }) {
  const { t } = useTranslation()
  const fileRef = useRef(null)

  const handleLogoUpload = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (ev) => onChange('logo', ev.target.result)
      reader.readAsDataURL(file)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="glass rounded-2xl p-6 sm:p-8"
    >
      <h2 className="text-xl font-bold text-white mb-5">{t('customizer.title')}</h2>

      <div className="space-y-5">
        <div>
          <label className="block text-sm text-white/50 mb-2">{t('customizer.foreground')}</label>
          <div className="flex items-center gap-3">
            <input
              type="color"
              value={fgColor}
              onChange={(e) => onChange('fgColor', e.target.value)}
              className="w-10 h-10 rounded-lg cursor-pointer border border-white/10 bg-transparent"
            />
            <span className="text-sm text-white/40 font-mono">{fgColor}</span>
          </div>
        </div>

        <div>
          <label className="block text-sm text-white/50 mb-2">{t('customizer.background')}</label>
          <div className="flex items-center gap-3">
            <input
              type="color"
              value={bgColor}
              onChange={(e) => onChange('bgColor', e.target.value)}
              className="w-10 h-10 rounded-lg cursor-pointer border border-white/10 bg-transparent"
            />
            <span className="text-sm text-white/40 font-mono">{bgColor}</span>
          </div>
        </div>

        <div>
          <label className="block text-sm text-white/50 mb-2">{t('customizer.size')}: {size}px</label>
          <input
            type="range"
            min="128"
            max="512"
            step="16"
            value={size}
            onChange={(e) => onChange('size', Number(e.target.value))}
            className="w-full accent-blue-500"
          />
          <div className="flex justify-between text-xs text-white/30 mt-1">
            <span>128px</span>
            <span>512px</span>
          </div>
        </div>

        <div>
          <label className="block text-sm text-white/50 mb-2">{t('customizer.errorCorrection')}</label>
          <div className="flex gap-2">
            {ecOptions.map((ec) => (
              <button
                key={ec}
                onClick={() => onChange('ecLevel', ec)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  ecLevel === ec
                    ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                    : 'bg-white/5 text-white/50 border border-white/10 hover:bg-white/10'
                }`}
              >
                {ec === 'L' && t('customizer.ecL')}
                {ec === 'M' && t('customizer.ecM')}
                {ec === 'Q' && t('customizer.ecQ')}
                {ec === 'H' && t('customizer.ecH')}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm text-white/50 mb-2">{t('customizer.logo')}</label>
          <div className="flex items-center gap-3">
            <input
              type="file"
              ref={fileRef}
              accept="image/png,image/jpeg"
              onChange={handleLogoUpload}
              className="hidden"
            />
            <motion.button
              type="button"
              onClick={() => fileRef.current?.click()}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-sm text-white/60 hover:text-white/90 transition-all"
            >
              {t('customizer.logoPlaceholder')}
            </motion.button>
            {logo && (
              <button
                onClick={() => onChange('logo', null)}
                className="text-red-400/60 hover:text-red-400 text-sm"
              >
                {t('history.delete')}
              </button>
            )}
          </div>
          <p className="text-xs text-white/30 mt-1">{t('customizer.logoHelp')}</p>
          {logo && (
            <div className="mt-3 w-14 h-14 rounded-lg overflow-hidden bg-white/5 p-1">
              <img src={logo} alt="logo" className="w-full h-full object-contain rounded" />
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}
