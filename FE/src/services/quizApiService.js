import instanceFromAxios from "../utils/axiosCustomize";

// quiz by paticipant

const getQuizByUser = () => {
    return instanceFromAxios.get('api/v1/quiz-by-participant')
}

const getQuizQuestion = (id) => {
    return instanceFromAxios.get(`api/v1/questions-by-quiz?quizId=${id}`)
}

// quiz by admin

const postCreateNewQuiz = (name, description, difficulty, quizImage) => {
    const data = new FormData();
    data.append('name', name);
    data.append('description', description);
    data.append('difficulty', difficulty);
    data.append('quizImage', quizImage);
    return instanceFromAxios.post('api/v1/quiz-by-admin', data)
}

const getQuizsByAdminWithPagin = (page, limit) => {
    return instanceFromAxios.get(`api/v1/quiz-by-admin?page=${page}&limit=${limit}`)
}

const getQuizsByAdmin = () => {
    return instanceFromAxios.get(`api/v1/quiz-by-admin/all`)
}

const deleteQuizByAdmin = (quizId) => {
    return instanceFromAxios.delete('api/v1/quiz-by-admin', { data: { id: quizId } })
}

const putUpdateQuizByAdmin = (id, name, description, quizImage, difficulty) => {
    const data = new FormData();
    data.append('id', id);
    data.append('name', name);
    data.append('description', description);
    data.append('quizImage', quizImage);
    data.append('difficulty', difficulty);
    return instanceFromAxios.put('api/v1/quiz-by-admin', data)
}

// Question And Answer
const getQuizQAByAdmin = (quizId) => {
    return instanceFromAxios.get(`api/v1/quiz-with-qa/${quizId}`)
}

const postUpsertQA = (data) => {
    return instanceFromAxios.post(`api/v1/quiz-upsert-qa`, { ...data })
}

const uploadCloudinary = (file) => {
    const data = new FormData();
    data.append('mp3File', file);
    return instanceFromAxios.post('api/v1/cloudinary', data)
}

export {
    getQuizByUser,
    getQuizQuestion,
    postCreateNewQuiz,
    getQuizsByAdmin,
    deleteQuizByAdmin,
    putUpdateQuizByAdmin,
    getQuizsByAdminWithPagin,
    getQuizQAByAdmin,
    postUpsertQA,
    uploadCloudinary
}