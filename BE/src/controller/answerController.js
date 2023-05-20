import answerService from '../service/answerService'

const handlePostAnswerByAdminController = async (req, res) => {
    try {
        let question_id = req.body.question_id;
        let description = req.body.description;
        let correct_answer = req.body.correct_answer;

        let data = await answerService.postAnswerByAdminService(question_id, description, correct_answer);
        return res.status(200).json({
            EM: data.EM, // Error Message
            EC: data.EC, // Error Code
            DT: data.DT, // Data
        })

    } catch (error) {
        console.log('>>>>> error from handlePostAnswerByAdminController :', error)
        return res.status(500).json({
            EM: data.EM, // Error Message
            EC: data.EC, // Error Code
            DT: data.DT, // Data
        })
    }
}

module.exports = {
    handlePostAnswerByAdminController
}