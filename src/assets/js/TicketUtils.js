export const ticketIdToName = (ticketId) => {
    switch (ticketId) {
        case 0:
            return "没有票";
        case 2:
            return "付费2倍票";
        case 3:
            return "付费3倍票";
        case 4:
            return "付费4倍票";
        case 5:
            return "付费5倍票";
        case 6:
            return "付费6倍票";
        case 10005:
            return "活动5倍票 (类型1)";
        case 10105:
            return "活动5倍票 (类型2)";
        case 10205:
            return "活动5倍票 (类型3)";
        case 11001:
            return "免费1.5倍票";
        case 11002:
            return "免费2倍票";
        case 11003:
            return "免费3倍票";
        case 11005:
            return "免费5倍票";
        case 20010:
            return "免费10倍票 (已失效)";
        case 20020:
            return "免费20倍票 (已失效)";
        case 30001:
            return "特殊2倍票";
        default:
            return "其他"
    }
}

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