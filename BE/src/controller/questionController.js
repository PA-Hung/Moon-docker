import questionService from '../service/questionService'
import cloudinary from '../config/configCloudinary'
const fs = require('fs');
const makeblob = (dataURL) => {
    const BASE64_MARKER = ';base64,';
    const parts = dataURL.split(BASE64_MARKER);
    return Buffer.from(parts[1], 'base64')
}

const isURL = (value) => {
    try {
        new URL(value);
        return true;
    } catch (error) {
        return false;
    }
}

const uploadAudio = async (fileStr) => {
    console.log('>>> check file input', fileStr);
    try {
        const uploadResponse = await cloudinary.uploader.upload(fileStr, {
            resource_type: 'video',
            upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET,
        });
        let audioURL = uploadResponse.secure_url
        //console.log('>>>>>>>>> check info', uploadResponse);
        return audioURL
    } catch (err) {
        console.error('>>>>> error from upload audio cloudinary :', err);
    }
}

const handlePostQuestionByAdminController = async (req, res) => {
    try {
        let quiz_id = req.body.quiz_id;
        let description = req.body.description;
        let fileUpload = req?.files?.questionImage

        if (!fileUpload) {
            let data = await questionService.postQuestionByAdminService_Image(quiz_id, description, fileUpload);
            return res.status(200).json({
                EM: data.EM, // Error Message
                EC: data.EC, // Error Code
                DT: data.DT, // Data
            })
        }

        if (fileUpload.mimetype == 'image/jpeg') {
            let data = await questionService.postQuestionByAdminService_Image(quiz_id, description, fileUpload.data);
            return res.status(200).json({
                EM: data.EM, // Error Message
                EC: data.EC, // Error Code
                DT: data.DT, // Data
            })
        }

        if (fileUpload.mimetype === 'audio/mpeg') {
            const filePath = `./src/upload/${fileUpload.name}`
            fs.writeFile(filePath, fileUpload.data, (err) => {
                if (err) {
                    console.error('Lỗi khi lưu trữ file:', err);
                    return;
                }
                console.log('File đã được lưu trữ thành công!');
                // Tiếp tục xử lý file hoặc thực hiện các tác vụ khác ở đây
            });
            let audioUrl = await uploadAudio(filePath)
            console.log('>>>> audioUrl >>>>', audioUrl);
            if (audioUrl) {
                let data = await questionService.postQuestionByAdminService_Audio(quiz_id, description, audioUrl);
                fs.unlink(filePath, (err) => {
                    if (err) throw err;
                    console.log('Tệp audio lưu tạm trước khi upload cloudinary đã xóa !');
                });
                return res.status(200).json({
                    EM: data.EM, // Error Message
                    EC: data.EC, // Error Code
                    DT: data.DT, // Data
                })
            }
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
            console.log('>>> controller', item.audioUrl);
            if (!isURL(item.audioUrl)) {
                item.audioUrl = ""
            }
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
    uploadAudio
}