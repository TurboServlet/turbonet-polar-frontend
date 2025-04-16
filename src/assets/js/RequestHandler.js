import axios from 'axios';

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
        return {statusCode: 401, data: "刷新Token失败，请重新登录"};
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
            return {statusCode: 401, data: "刷新Token失效，请重新登入"};
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
                    data: "与服务器连接超时，请检查网络连接"
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
                data: error.response.data.message
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
            return {statusCode: 401, data: "刷新Token失效，请重新登入"};
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
                    data: "与服务器连接超时，请检查网络连接"
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
                data: error.response.data.message
            };
        });
}