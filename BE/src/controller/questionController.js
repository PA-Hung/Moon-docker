import questionService from '../service/questionService'
const makeblob = (dataURL) => {
    const BASE64_MARKER = ';base64,';
    const parts = dataURL.split(BASE64_MARKER);
    const contentType = parts[0].split(':')[1];
    return Buffer.from(parts[1], 'base64')
}

const handlePostQuestionByAdminController = async (req, res) => {
    try {
        let quiz_id = req.body.quiz_id;
        let description = req.body.description;

        if (req.files == null) {
            return res.status(200).json({
                EM: 'No image file were uploaded !', // Error Message
                EC: -1, // Error Code
                DT: [], // Data
            })
        } else {
            let image = req?.files?.questionImage?.data
            // console.log('>>>>>>>>>>>>>>>>>>', req?.files);
            // console.log('>>>>>>>>>>>>>>>>>>', req?.files?.questionImage);
            // console.log('>>>>>>>>>>>>>>>>>>', image);
            let data = await questionService.postQuestionByAdminService(quiz_id, description, image);
            return res.status(200).json({
                EM: data.EM, // Error Message
                EC: data.EC, // Error Code
                DT: data.DT, // Data
            })
        }
    } catch (error) {
        console.log('>>>>> error from handlePostQuestionByAdminController :', error)
        return res.status(500).json({
            EM: data.EM, // Error Message
            EC: data.EC, // Error Code
            DT: data.DT, // Data
        })
    }
}

const handleQuizUpsertQAController = async (req, res) => {
    try {
        let { quizId, questions } = req.body;
        questions = questions.map(item => {
            if (item.image) {
                item.image = makeblob(item.image)
            }
            return item;
        })
        let data = await questionService.postQuizUpsertQAService(quizId, questions);
        return res.status(200).json({
            EM: data.EM, // Error Message
            EC: data.EC, // Error Code
            DT: data.DT, // Data
        })

    } catch (error) {
        console.log('>>>>> error from handleQuizUpsertQAController :', error)
        return res.status(500).json({
            EM: data.EM, // Error Message
            EC: data.EC, // Error Code
            DT: data.DT, // Data
        })
    }
}

module.exports = {
    handlePostQuestionByAdminController,
    handleQuizUpsertQAController,
}