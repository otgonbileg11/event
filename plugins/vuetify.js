import {createVuetify} from 'vuetify'
import * as components from 'vuetify/components'

export default defineNuxtPlugin((nuxt) => {
  const vuetify = createVuetify({
    ssr: true,
    components
  })
  nuxt.vueApp.use(vuetify)
})