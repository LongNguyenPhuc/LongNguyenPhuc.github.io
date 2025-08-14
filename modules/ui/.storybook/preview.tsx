import React from 'react'
import { Decorator } from '@storybook/react'
import { Suspense, useEffect } from 'react'
import { I18nextProvider } from 'react-i18next'
import { UIPlugin } from '../src/plugins'
import i18n, { initializeI18n } from '../../../libs/utils/i18n'
import '../../../libs/styles/index.css'

i18n.init(initializeI18n({ backend: { backends: [UIPlugin] } }))

export const globalTypes = {
  locale: {
    name: 'Locale',
    description: 'Internationalization locale',
    toolbar: {
      icon: 'globe',
      items: [
        { value: 'en', title: 'English' },
        { value: 'vi', title: 'Vietnamese' }
      ],
      showName: true
    }
  }
}

const WithI18Next: Decorator = (Story, context) => {
  const { locale } = context.globals

  // When the locale global changes
  // Set the new locale in i18n
  useEffect(() => {
    i18n.changeLanguage(locale)
  }, [locale])

  return (
    <Suspense fallback={<div>loading translations...</div>}>
      <I18nextProvider i18n={i18n}>
        <Story />
      </I18nextProvider>
    </Suspense>
  )
}

// export decorators for storybook to wrap your stories in
export const decorators = [WithI18Next]
