import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'

export default defineNuxtPlugin((nuxtApp) => {
    const vuetify = createVuetify({
        theme: {
            defaultTheme: 'dark',
            themes: {
                dark: {
                    colors: {
                        primary: '#FF8200',
                        secondary: '#00E5FF',
                        background: '#1A1B1E',
                        surface: '#2C2E33',
                    },
                },
            },
        },
    })
    nuxtApp.vueApp.use(vuetify)
})
