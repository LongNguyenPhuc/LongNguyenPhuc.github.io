import type { BackendModule } from 'i18next'

export const UIPlugin: BackendModule = {
  type: 'backend',
  init: function (services, backendOptions, i18nextOptions) {
    /* use services and options */
  },
  read: async (language, namespace) => {
    const [type, module] = namespace.split('/')
    return await import(`../../${type}/${module}/lib/locales/${language}.json`)
  }
}

export default UIPlugin
