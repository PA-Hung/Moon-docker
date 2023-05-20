import instanceFromAxios from "../utils/axiosCustomize";

const postLogin = (username, password) => {
    return instanceFromAxios.post('api/v1/login', {
        username,
        password,
        delay: 500
    })
}

const postLogout = (username, refresh_token) => {
    return instanceFromAxios.post('api/v1/logout', { username, refresh_token })
}

export {
    postLogin,
    postLogout
}