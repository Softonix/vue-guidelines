import { createApp } from 'vue'
import App from '@/App.vue'

import { router } from '@/router'

import {
  VueGlobalPropertiesPlugin
} from '@/plugins'

import '@/assets/styles/main.css'

const app = createApp(App)

app
  .use(createPinia())
  .use(router)
  .use(VueGlobalPropertiesPlugin)

router.isReady().then(() => {
  app.mount('#app')
})

export {
  app
}
