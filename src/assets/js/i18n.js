import { createI18n } from 'vue-i18n'
import en from '@/assets/locales/en.json'
import zh from '@/assets/locales/zh.json'
import zht from '@/assets/locales/zht.json'
import ja from '@/assets/locales/ja.json'
import ko from '@/assets/locales/ko.json'
import ar from '@/assets/locales/ar.json'

const messages = { zh, en, zht, ja, ko, ar }

const i18n = createI18n({
    legacy: false,
    locale: 'zh',
    fallbackLocale: 'zh',
    messages
})

export default i18n
