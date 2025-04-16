import i18n from './i18n.js'
const { t } = i18n.global

export const ticketIdToName = (ticketId) => {
    return t(`ticketUtils.ticketIdToName.${ticketId}`, t('ticketUtils.ticketIdToName.unknown'));
};
export const ticketIdToImg = (ticketId) => {
    switch (ticketId) {
        case 0:
            return "/img/ticket/noticket.png";
        case 2:
            return "/img/ticket/paid_2x.png";
        case 3:
            return "/img/ticket/paid_3x.png";
        case 4:
            return "/img/ticket/paid_4x.png";
        case 5:
            return "/img/ticket/paid_5x.png";
        case 6:
            return "/img/ticket/paid_6x.png";
        case 10005:
            return "/img/ticket/event_5x.png";
        case 10105:
            return "/img/ticket/event_5x.png";
        case 10205:
            return "/img/ticket/event_5x.png";
        case 11001:
            return "/img/ticket/free_1.5x.png";
        case 11002:
            return "/img/ticket/paid_2x.png";
        case 11003:
            return "/img/ticket/paid_3x.png";
        case 11005:
            return "/img/ticket/event_5x.png";
        case 20010:
            return "/img/ticket/free_1.5x.png";
        case 20020:
            return "/img/ticket/free_1.5x.png";
        case 30001:
            return "/img/ticket/special_2x.png";
        default:
            return "/img/ticket/noticket.png"
    }
}

export const ticketIdToFlatImg = (ticketId) => {
    switch (ticketId) {
        case 0:
            return "/img/ticket/flat/noticket_flat.png";
        case 2:
            return "/img/ticket/flat/paid_2x_flat.png";
        case 3:
            return "/img/ticket/flat/paid_3x_flat.png";
        case 4:
            return "/img/ticket/flat/paid_4x_flat.png";
        case 5:
            return "/img/ticket/flat/paid_5x_flat.png";
        case 6:
            return "/img/ticket/flat/paid_6x_flat.png";
        case 10005:
            return "/img/ticket/flat/event_5x_flat.png";
        case 10105:
            return "/img/ticket/flat/event_5x_flat.png";
        case 10205:
            return "/img/ticket/flat/event_5x_flat.png";
        case 11001:
            return "/img/ticket/flat/free_1.5x_flat.png";
        case 11002:
            return "/img/ticket/flat/paid_2x_flat.png";
        case 11003:
            return "/img/ticket/flat/paid_3x_flat.png";
        case 11005:
            return "/img/ticket/flat/event_5x_flat.png";
        case 20010:
            return "/img/ticket/flat/free_1.5x_flat.png";
        case 20020:
            return "/img/ticket/flat/free_1.5x_flat.png";
        case 30001:
            return "/img/ticket/flat/special_2x_flat.png";
        default:
            return "/img/ticket/flat/noticket_flat.png"
    }
}