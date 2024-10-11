export const fixIcon = (iconId) => {
    const fixIconId = (iconId % 100000)
    if (iconId > 0 && iconId < 10000) {
        return fixIconId
    }
    if (iconId >= 10000 && iconId < 100000) {
        return fixIconId % 10000
    }
    return fixIconId
}

export const levelColor = (level) => {
    switch (level) {
        case 0:
            return 'level-0';
        case 1:
            return 'level-1';
        case 2:
            return 'level-2';
        case 3:
            return 'level-3';
        case 4:
            return 'level-4';
        default:
            return 'level-4';
    }
}

export const rankColor = (achievement) => {
    if (achievement <= 92) {
        return 'rank-B';
    } else if (achievement > 92 && achievement < 97) {
        return 'rank-A';
    } else {
        return 'rank-S';
    }
}

export const badgeColor = (diff) => {
    switch (diff) {
        case 0:
            return 'diff-badge-basic'
        case 1:
            return 'diff-badge-advanced'
        case 2:
            return 'diff-badge-expert'
        case 3:
            return 'diff-badge-master'
        case 4:
            return 'diff-badge-remaster'
    }
}

export const diffName = (diff) => {
    switch (diff) {
        case 0:
            return 'Basic'
        case 1:
            return 'Advanced'
        case 2:
            return 'Expert'
        case 3:
            return 'Master'
        case 4:
            return 'ReMaster'
    }
}
