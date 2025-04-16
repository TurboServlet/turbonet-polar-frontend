import i18n from './i18n.js'
const { t } = i18n.global

export const ArcadeSettingEnumToString = (setting) => {
    switch (setting) {
        case "MASK_USERNAME":
            return t('arcadeSettingEnum.maskUsername');
        case "UDEMAE_SHOW_ACHIEVEMENT":
            return t('arcadeSettingEnum.udemaeShowAchievement');
        case "DISABLE_TICKET":
            return t('arcadeSettingEnum.disableTicket');
        case "DISABLE_CUSTOM_NAME":
            return t('arcadeSettingEnum.disableCustomName');
        case "DISABLE_CUSTOM_AVATAR":
            return t('arcadeSettingEnum.disableCustomAvatar');
        default:
            return t('arcadeSettingEnum.unknown');
    }
}

export const ArcadeFunctionTypeStringToEnum = (functionType) => {
    switch (functionType) {
        case "LOGIN":
            return t('arcadeFunctionType.login');
        case "KASTANJ_LOGIN":
            return t('arcadeFunctionType.kastanjLogin');
        case "SPECIAL_TYPE_ONE_LOGIN":
            return t('arcadeFunctionType.specialTypeOneLogin');
        case "PING":
            return t('arcadeFunctionType.ping');
    }
}

export const ArcadeTypeEnumToString = (arcadeType) => {
    switch (arcadeType) {
        case "TURBO":
            return "Turbo";
        case "SPECIAL_TYPE_ONE":
            return "2077"
    }
}