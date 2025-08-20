import { createApp } from 'vue'
import App from '@/App.vue'

import { router } from '@/router'
import { store } from '@/store/create-store'

import {
  PortalPlugin,
  I18nPlugin,
  VueGlobalPropertiesPlugin
} from '@/plugins'

import '@/assets/styles/main.css'

const app = createApp(App)

app
  .use(store)
  .use(router)
  .use(PortalPlugin)
  .use(I18nPlugin)
  .use(VueGlobalPropertiesPlugin)

router.isReady().then(() => {
  app.mount('#app')
})

export {
  app
}
