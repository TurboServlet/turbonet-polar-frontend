import { ref } from "vue";
import { sendGetRequest } from "@/assets/js/RequestHandler.js";
import i18n from './i18n.js'
const { t } = i18n.global
const factorWorker = new Worker(new URL("./factor.worker.js", import.meta.url));

export const executeRecaptcha = async () => {
    const isSuccess = ref(false);
    const responseData = ref(null);

    await sendGetRequest("/captcha/generatePoW", false)
        .then((response) => {
            if (response.statusCode === 200) {
                isSuccess.value = true;
                responseData.value = response.data;
            }
        })
        .catch(() => {});

    if (!isSuccess.value) {
        throw new Error(t('captchaSolver.fetchError'));
    }

    const { n, e, c, token } = responseData.value;

    const result = await new Promise((resolve, reject) => {
        factorWorker.onmessage = (evt) => {
            const data = evt.data;
            if (data.error) {
                reject(data.error);
            } else if (data.success) {
                resolve({ token: data.token, a: data.a });
            }
        };

        factorWorker.postMessage({ n, e, c, token });
    });

    return result;
};
