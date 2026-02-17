import './assets/css/base.css'
import {createApp} from 'vue'
import App from './App.vue'
import i18n from '@/assets/js/i18n.js'

import {createRouter, createWebHistory} from 'vue-router'
import Index from "@/views/index/Index.vue";
import TermsOfService from "@/views/index/TermsOfService.vue";
import Register from "@/views/register/Register.vue";
import {useReCaptcha, VueReCaptcha} from "vue-recaptcha-v3";
import Verify from "@/views/register/Verify.vue";
import MainLayouts from "@/layouts/MainLayouts.vue";
import Panel from "@/views/panel/Panel.vue";
import User from "@/views/user/User.vue";
import TurboPermission from "@/views/turboPermission/TurboPermission.vue";
import BotManager from "@/views/botManager/BotManager.vue";
import Photos from "@/views/photos/Photos.vue";
import Privacy from "@/views/index/Privacy.vue";
import Records from "@/views/records/Records.vue";
import DxRatingRanking from "@/views/ranking/DxRatingRanking.vue";
import MusicRanking from "@/views/ranking/MusicRanking.vue";
import AchievementRanking from "@/views/ranking/AchievementRanking.vue";
import ChangeTurboName from "@/views/changeMaimaiName/ChangeMaimaiName.vue";
import ChangeAvatar from "@/views/changeAvatar/ChangeAvatar.vue";
import CurrentTickets from "@/views/tickets/CurrentTickets.vue";
import SetTickets from "@/views/tickets/SetTickets.vue";
import ArcadeInfo from "@/views/arcadeInfo/ArcadeInfo.vue";
import Friends from "@/views/friends/Friends.vue";
import AddFriends from "@/views/friends/AddFriends.vue";
import NetworkStatus from "@/views/networkStatus/NetworkStatus.vue";
import ServerRequests from "@/views/serverRequests/ServerRequests.vue";
import Support from "@/views/support/Support.vue";
import SupportSession from "@/views/support/SupportSession.vue";
import ResetEmailVerify from "@/views/support/ResetEmailVerify.vue";
import NotFound from "@/views/NotFound.vue";
import QrCommand from "@/views/qrCommand/QrCommand.vue";
import ArcadeAlias from "@/views/arcadeAlias/ArcadeAlias.vue";
import DivingFishUpload from "@/views/AchievementUpload/DivingFishUpload.vue";
import LXNSUpload from "@/views/AchievementUpload/LXNSUpload.vue";

const routes = [
    {path: '/', component: Index, name: '主页'},
    {path: '/register', component: Register, name: '注册'},
    {path: '/register/verify', component: Verify, name: '注册验证'},
    {path: '/tos', component: TermsOfService, name: '使用条款'},
    {path: '/privacy', component: Privacy, name: '隐私政策'},
    {path: '/u/:username', name: '用户信息', component: User},
    {path: '/musicRanking/:musicId/:diff', name: '乐曲排行榜', component: MusicRanking},
    {path: '/dxRatingRanking', name: 'DX RATING排行榜', component: DxRatingRanking},
    {path: '/achievementRanking', name: '总分数排行榜', component: AchievementRanking},
    {path: '/support', name: '支持', component: Support},
    {path: '/support/session/:sessionId', name: '支持会话', component: SupportSession},
    {path: '/support/resetEmailVerify', name: '重置邮箱验证', component: ResetEmailVerify},
    {path: '/:pathMatch(.*)*', name: '404', component: NotFound},
    {
        path: '/panel',
        component: MainLayouts,
        children: [
            {path: '', name: '面板', component: Panel},
            {path: '/turboPermission', name: '用户权限', component: TurboPermission},
            {path: '/botManager', name: 'BOT管理', component: BotManager},
            {path: '/arcadeInfo', name: '机厅信息', component: ArcadeInfo},
            {path: '/arcadeAlias', name: '机厅简称', component: ArcadeAlias},
            {path: '/photos', name: '相片', component: Photos},
            {path: '/records', name: '游戏记录', component: Records},
            {path: '/changeMaimaiName', name: '更改舞萌名称', component: ChangeTurboName},
            {path: '/changeAvatar', name: '更改头像', component: ChangeAvatar},
            {path: '/currentTickets', name: '当前持有的功能票', component: CurrentTickets},
            {path: '/setTickets', name: '设置功能票', component: SetTickets},
            {path: '/qrCommand', name: '机台二维码', component: QrCommand},
            {path: '/friends', name: '我的好友', component: Friends},
            {path: '/addFriends', name: '添加好友', component: AddFriends},
            {path: '/networkStatus', name: '机厅网络状态', component: NetworkStatus},
            {path: '/serverRequests', name: '服务器请求统计', component: ServerRequests},
            {path: '/DivingFishUpload', name: '水鱼查分器上传', component: DivingFishUpload},
            {path: '/LxnsUpload', name: '落雪查分器上传', component: LXNSUpload}
        ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    window.document.title = 'TurboNET Polar | ' + to.name.toString()
    next()
})

const app = createApp(App)
app.use(VueReCaptcha, {
    siteKey: '6Ld75zMqAAAAABkdslP1lnKl11hGrozmSgvHHztw', loaderOptions: {
        useRecaptchaNet: true,
        autoHideBadge: true
    }
})

app.use(i18n)
app.use(router)
app.mount('#app')