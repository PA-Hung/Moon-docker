import instanceFromAxios from "../utils/axiosCustomize";

const postQuestionQuizByAdmin = (quiz_id, description, questionImage, questionAudio) => {
    console.log('>>questionImage>>>', questionImage);
    const data = new FormData();
    data.append('quiz_id', quiz_id);
    data.append('description', description);
    data.append('questionImage', questionImage);
    data.append('questionAudio', questionAudio);
    return instanceFromAxios.post('api/v1/question', data)
}

const postAnswerQuestionByAdmin = (question_id, description, correct_answer) => {
    return instanceFromAxios.post('api/v1/answer', {
        question_id, description, correct_answer
    })
}

export {
    postQuestionQuizByAdmin,
    postAnswerQuestionByAdmin,
}