'use client'
// Core
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import i18n, { InitOptions } from 'i18next'
import ChainedBackend, { ChainedBackendOptions } from 'i18next-chained-backend'

// App
export enum Language {
  Vi = 'vi',
  En = 'en'
}

// Supported languages
export const SUPPORTED_LANGUAGES = Object.values<string>(Language)

export function initializeI18n(config: InitOptions<ChainedBackendOptions>): InitOptions<ChainedBackendOptions> {
  return {
    load: 'languageOnly',
    fallbackLng: Language.Vi,
    supportedLngs: Object.values<string>(Language),
    interpolation: { escapeValue: false }, // react already safes from xss
    detection: {
      order: ['path', 'navigator', 'localStorage', 'cookie', 'htmlTag'],
      lookupFromPathIndex: 0,
      convertDetectedLanguage: (lng) => (SUPPORTED_LANGUAGES.includes(lng) ? lng : Language.Vi)
    },
    ...config
  }
}

// Middlewares
i18n.use(LanguageDetector).use(ChainedBackend).use(initReactI18next) // passes i18n down to react-i18next

export default i18n
