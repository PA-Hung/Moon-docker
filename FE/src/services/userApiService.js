import instanceFromAxios from "../utils/axiosCustomize";

const getUserProfile = () => {
    return instanceFromAxios.get('api/v1/profile')
}

const getUserHistory = () => {
    return instanceFromAxios.get('api/v1/history')
}

const postSubmitQuiz = (data) => {
    return instanceFromAxios.post(`api/v1/quiz-submit`, { ...data })
}

const putUserProfile = (username, email, oldPassword, newPassword, userImage) => {
    const data = new FormData();
    data.append('username', username);
    data.append('email', email);
    data.append('oldPassword', oldPassword);
    data.append('newPassword', newPassword);
    data.append('userImage', userImage);
    return instanceFromAxios.put('api/v1/profile', data)
}

export {
    getUserProfile,
    getUserHistory,
    postSubmitQuiz,
    putUserProfile

}