import i18n from './i18n.js'
const { t } = i18n.global

export const PermissionRedirect = (permission) => {
    switch (permission) {
        case "基础只读内容":
            return t('permissionUtils.basicReadOnlyContent');
        case "基础交互内容":
            return t('permissionUtils.basicInteractiveContent');
        case "好友功能":
            return t('permissionUtils.friend');
        case "BOT管理":
            return t('permissionUtils.botManagement');
        case "更改用户名":
            return t('permissionUtils.changeUsername');
        case "更改头像":
            return t('permissionUtils.changeAvatar');
        case "锁定Turbo功能票":
            return t('permissionUtils.turboTicket');
        case "设置机厅简称":
            return t('permissionUtils.setAlias');
        case "更改盒子机台设置":
            return t('permissionUtils.changeTurboSettings');
        case "授权许可用户":
            return t('permissionUtils.authorizeAuthorizer');
        case "授权技术实施员":
            return t('permissionUtils.authorizeTechnician');
        case "警告&封禁用户":
            return t('permissionUtils.warnAndBanUser');
        default:
            return permission;
    }
}
