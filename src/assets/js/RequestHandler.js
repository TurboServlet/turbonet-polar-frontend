import axios from 'axios';
import i18n from './i18n.js'
const { t } = i18n.global

const baseUrl = "https://api.sys-allnet.com"

// const baseUrl = "http://localhost:25566"

const tokenRefreshHandler = async (override = false, func = async () => {
}) => {
    const refreshTokenRequestVO = {
        refreshToken: localStorage.getItem("refreshToken")
    }
    return await axios.post(
        baseUrl + "/auth/refreshToken",
        refreshTokenRequestVO
    ).then(async (response) => {
        localStorage.setItem("token", response.data.token);
        if (override) {
            return await func();
        }
    }).catch(error => {
        clearToken();
        return {statusCode: 401, data: t('requestHandler.loginError')};
    });
}

export const clearToken = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("botToken");
}

export const sendGetRequest = async (endpoint, flagged = true, times = 0) => {

    let config = {}

    if (flagged) {
        if (localStorage.getItem("token") == null) {
            await tokenRefreshHandler(false);
        }

        if (times > 8) {
            clearToken()
            return {statusCode: 401, data: t('requestHandler.loginError')};
        }

        config = {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        }
    }

    return await axios.get(baseUrl + endpoint, config)
        .then((response) => {
            return {
                statusCode: response.status,
                data: response.data
            };
        })
        .catch(async (error) => {
            if (error.code === "ERR_NETWORK") {
                return {
                    statusCode: 400,
                    data: t('requestHandler.timeoutError')
                };
            }

            let statusCode = error.response.status;
            if (flagged) {
                // token expired or invalid
                if (statusCode === 401) {
                    await new Promise(r => setTimeout(r, 200));
                    return await tokenRefreshHandler(true, () => sendGetRequest(endpoint, flagged, times + 1)
                    )

                }
            }

            return {
                statusCode: statusCode,
                data: errorMessageRedirect(statusCode, error.response.data.message)
            };
        });
}

export const sendPostRequest = async (endpoint, payload, flagged = true, times = 0) => {

    let config = {}

    if (flagged) {
        if (localStorage.getItem("token") == null) {
            await tokenRefreshHandler(false)
        }

        if (times > 8) {
            clearToken()
            return {statusCode: 401, data: t('requestHandler.loginError')};
        }

        config = {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        }
    }

    return await axios.post(baseUrl + endpoint, payload, config)
        .then((response) => {
            return {
                statusCode: response.status,
                data: response.data
            };
        })
        .catch(async (error) => {
            if (error.code === "ERR_NETWORK") {
                return {
                    statusCode: 400,
                    data: t('requestHandler.timeoutError')
                };
            }
            let statusCode = error.response.status;
            if (flagged) {
                // token expired or invalid
                if (statusCode === 401) {
                    await new Promise(r => setTimeout(r, 200));
                    return await tokenRefreshHandler(true, () => sendPostRequest(endpoint, payload, flagged, times + 1)
                    )
                }
            }

            return {
                statusCode: statusCode,
                data: errorMessageRedirect(statusCode, error.response.data.message)
            };
        });
}

const errorMessageRedirect = (statusCode, data) => {
    switch (statusCode) {
        case 400:
            return t('requestHandler.badRequestError') + ' (' + data + ')' // 400 (illegal data & captcha failed)
        case 401:
            return t('requestHandler.loginError') + ' (' + data + ')' // 401 (token expired or invalid)
        case 403:
            return t('requestHandler.permissionError') + ' (' + data + ')' // 403 (no permission)
        case 410:
            return t('requestHandler.bannedError') + ' (' + data + ')' // 410 (user banned)
        case 500:
            return t('requestHandler.internalServerError') + ' (' + data + ')' // 500 (internal server error)
        default:
            return t('requestHandler.unknownError') + ' (' + data + ')' // unknown error
    }
}