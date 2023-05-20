import instanceFromAxios from "../utils/axiosCustomize";

const postCreateNewUser = (email, password, username, role, userImage) => {
    const data = new FormData();
    data.append('email', email);
    data.append('password', password);
    data.append('username', username);
    data.append('role', role);
    data.append('userImage', userImage);
    return instanceFromAxios.post('api/v1/participant', data)
}

const getAllUser = () => {
    return instanceFromAxios.get('api/v1/participant')
}

const getAllUserWithPagin = (page, limit) => {
    return instanceFromAxios.get(`api/v1/participant?page=${page}&limit=${limit}`)
}

const putUpdateUser = (id, email, password, username, role, userImage) => {
    const data = new FormData();
    data.append('id', id);
    data.append('email', email);
    data.append('password', password);
    data.append('username', username);
    data.append('role', role);
    data.append('userImage', userImage);
    return instanceFromAxios.put('api/v1/participant', data)
}

const deleteUser = (userId) => {
    return instanceFromAxios.delete('api/v1/participant', { data: { id: userId } })
}

const postAssignQuiz = (quizId, userId) => {
    return instanceFromAxios.post('api/v1/quiz-assign-to-user', { quizId, userId })
}

const getDataOverView = () => {
    return instanceFromAxios.get(`api/v1/dashboard`)
}

export {
    postCreateNewUser,
    getAllUser,
    putUpdateUser,
    deleteUser,
    getAllUserWithPagin,
    postAssignQuiz,
    getDataOverView
}