import { createI18n } from 'vue-i18n'
// import en from '@/assets/locales/en.json'
import zh from '@/assets/locales/zh.json'

const messages = { zh }

const i18n = createI18n({
    legacy: false,
    locale: 'zh',
    fallbackLocale: 'zh',
    messages
})

export default i18n
