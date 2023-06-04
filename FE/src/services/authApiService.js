import instanceFromAxios from "../utils/axiosCustomize";

const postLogin = (username, password) => {
    return instanceFromAxios.post('api/v1/login', {
        username,
        password,
    })
}

const postRegister = (username, email, password) => {
    return instanceFromAxios.post('api/v1/register', { username, email, password, })
}

const postLogout = (username, refresh_token) => {
    return instanceFromAxios.post('api/v1/logout', { username, refresh_token })
}

export {
    postLogin,
    postLogout,
    postRegister
}