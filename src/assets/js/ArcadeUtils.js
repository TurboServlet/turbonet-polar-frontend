export const ArcadeSettingEnumToString = (setting) => {
    switch (setting) {
        case "MASK_USERNAME":
            return "遮挡用户名";
        case "UDEMAE_SHOW_ACHIEVEMENT":
            return "友人对战显示完成度";
        case "DISABLE_TICKET":
            return "禁用 Turbo 功能票";
        case "DISABLE_CUSTOM_NAME":
            return "禁用自定义名称";
        case "DISABLE_CUSTOM_AVATAR":
            return "禁用自定义头像";
        default:
            return "未知设置"
    }
}

export const ArcadeFunctionTypeStringToEnum = (functionType) => {
    switch (functionType) {
        case "LOGIN":
            return "加速盒子机台登入";
        case "KASTANJ_LOGIN":
            return "加速盒子机台 Kastanj 服务登入";
        case "SPECIAL_TYPE_ONE_LOGIN":
            return "2077 服务机台登入";
        case "PING":
            return "PING 机台";
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