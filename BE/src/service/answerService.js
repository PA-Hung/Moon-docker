import db from '../models/index';

const postAnswerByAdminService = async (question_id, description, correct_answer) => {
    try {
        let data = await db.QuizAnswers.create({
            question_id: question_id,
            description: description,
            correct_answer: correct_answer,
        })
        return {
            EM: 'Create Answer success !',
            EC: 0,
            DT: data,
        }
    } catch (error) {
        console.log(">>> check error: ", error)
        return {
            EM: 'Error from postAnswerByAdminService',
            EC: 1,
            DT: [],
        }
    }
}

module.exports = {
    postAnswerByAdminService
}