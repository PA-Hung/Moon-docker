import db from '../models/index';
import _ from 'lodash'
import cloudinary from '../config/configCloudinary'

const postQuestionByAdminService_Image = async (quiz_id, description, image) => {
    try {
        let data = await db.QuizQuestions.create({
            quiz_id: quiz_id,
            description: description,
            image: image,
        })
        return {
            EM: 'Create question success !',
            EC: 0,
            DT: data,
        }
    } catch (error) {
        console.log(">>> check error: ", error)
        return {
            EM: 'Error from postQuestionByAdminService',
            EC: 1,
            DT: [],
        }
    }
}

const postQuestionByAdminService_Audio = async (quiz_id, description, fileUrl) => {
    try {
        let data = await db.QuizQuestions.create({
            quiz_id: quiz_id,
            description: description,
            audioUrl: fileUrl,
        })
        return {
            EM: 'Create question success !',
            EC: 0,
            DT: data,
        }
    } catch (error) {
        console.log(">>> check error: ", error)
        return {
            EM: 'Error from postQuestionByAdminService',
            EC: 1,
            DT: [],
        }
    }
}

const postQuizUpsertQAService = async (quizId, questions) => {
    let res = await db.QuizQuestions.findAll({
        attributes: ["id", "quiz_id", "description"],
        where: { quiz_id: quizId },
        include: [
            {
                model: db.QuizAnswers,
                attributes: ["id", "question_id", "description", "correct_answer"],
            },
        ],
    })

    // --------------------------------------------/ Cập nhật câu hỏi
    if (questions.length === res.length) {
        console.log('cập nhật câu hỏi');

        let feLength = 0
        for (let i = 0; i < questions.length; i++) {
            const feQuizAnswers = questions[i].QuizAnswers
            feLength += feQuizAnswers.length
        }

        let beLength = 0
        for (let i = 0; i < res.length; i++) {
            const beQuizAnswers = res[i].QuizAnswers
            beLength += beQuizAnswers.length
        }

        if (feLength === beLength) {
            console.log('cập nhật câu hỏi và trả lời .')
            for (const question of questions) {
                console.log(">>>>>>>>>>>", question.audioUrl);
                await db.QuizQuestions.update({
                    description: question.description,
                    image: question.image,
                    audioUrl: question.audioUrl
                }, {
                    where: { id: question.id }
                })
                await Promise.all(question.QuizAnswers.map(async (answer) => {
                    // Trả về Promise từ db.QuizAnswers.update() để đợi kết quả trả về
                    return db.QuizAnswers.update(
                        {
                            description: answer.description,
                            correct_answer: answer.correct_answer,
                        },
                        {
                            where: { id: answer.id }
                        }
                    );
                }));
            }
        }
        if (feLength > beLength) {
            console.log('thêm câu trả lời mới.')

            let qAnswerFe = questions.map((question) => {
                return question.QuizAnswers.map((answer) => {
                    return {
                        answerId: answer.id,
                        description: answer.description,
                        correct_answer: answer.correct_answer,
                        question_id: question.id
                    }
                })
            })

            let qAnswerBe = res.map((item) => {
                return item.QuizAnswers.map((item) => {
                    return {
                        answerId: item.id,
                        description: item.description,
                        correct_answer: item.correct_answer,
                        question_id: item.question_id
                    }
                })
            })

            const uniqueAnswers = [];
            qAnswerFe.forEach((questionFe, index) => {
                const questionBe = qAnswerBe[index];
                const uniqueAnswersQuestion = [];

                questionFe.forEach((answerFe) => {
                    const answerBe = questionBe.find((answer) => answer.answerId === answerFe.answerId);

                    if (!answerBe) {
                        uniqueAnswersQuestion.push(answerFe);
                    }
                });

                uniqueAnswers.push(uniqueAnswersQuestion);
            });

            for (const question of uniqueAnswers) {
                await Promise.all(question.map(async (answer) => {
                    return db.QuizAnswers.create(
                        {
                            description: answer.description,
                            correct_answer: answer.correct_answer,
                            question_id: answer.question_id
                        }
                    );
                }));
            }
        }

        if (feLength < beLength) {
            console.log('xóa câu trả lời.')
            let answerIdFe = questions.map((item) => {
                return item.QuizAnswers.map((item) => {
                    return item.id
                })
            })
            //console.log('data fe', answerIdFe);
            let answerIdBe = res.map((item) => {
                return item.QuizAnswers.map((item) => {
                    return item.id
                })
            })
            //console.log('data be', answerIdBe);

            const allIdsFe = answerIdFe.flat();
            const allIdsBe = answerIdBe.flat();

            // tìm các id không trùng nhau trong hai mảng allIdsFe và allIdsBe
            const uniqueIds = allIdsBe.filter(id => !allIdsFe.includes(id));

            //console.log(uniqueIds); 
            await Promise.all(
                uniqueIds.map(async (id) => {
                    return db.QuizAnswers.destroy({ where: { id } });
                })
            );
        }

    }

    // -------------------------------------------/ thêm câu hỏi
    if (questions.length > res.length) {
        console.log('thêm câu hỏi');

        let QaFe = questions.map((question) => {
            return {
                id: question.id,
                description: question.description,
                imgFile: question.image,
                audioUrl: question.audioUrl,
                QuizAnswers: question.QuizAnswers.map((answer) => {
                    return {
                        id: answer.id,
                        description: answer.description,
                        correct_answer: answer.correct_answer,
                        question_id: answer.question_id
                    }
                })
            }
        });

        let QaBe = res.map((question) => {
            return {
                id: question.id,
                description: question.description,
                imgFile: question.image,
                audioUrl: question.audioUrl,
                QuizAnswers: question.QuizAnswers.map((answer) => {
                    return {
                        id: answer.id,
                        description: answer.description,
                        correct_answer: answer.correct_answer,
                        question_id: answer.question_id
                    }
                })
            }
        });

        // Tạo một mảng rỗng để lưu trữ các đối tượng không trùng lặp
        let uniqueData = [];

        // Duyệt qua từng đối tượng trong mảng QaFe
        QaFe.forEach((questionFe) => {
            // Tìm đối tượng tương ứng trong mảng QaBe
            let questionBe = QaBe.find((question) => question.id === questionFe.id);

            // Nếu không tìm thấy đối tượng trong QaBe, thì đối tượng trong QaFe là đối tượng không trùng lặp
            if (!questionBe) {
                uniqueData.push(questionFe);
            }
        });

        // In ra mảng mới
        for (const questionFe of uniqueData) {
            const createdQuestion = await db.QuizQuestions.create({
                description: questionFe.description,
                image: questionFe.imgFile,
                audioUrl: questionFe.audioUrl,
                quiz_id: quizId
            });

            for (const answer of questionFe.QuizAnswers) {
                await db.QuizAnswers.create({
                    description: answer.description,
                    correct_answer: answer?.correct_answer,
                    question_id: createdQuestion.id
                });
            }
        }


        let feLength = 0
        for (let i = 0; i < questions.length; i++) {
            const feQuizAnswers = questions[i].QuizAnswers
            feLength += feQuizAnswers.length
        }

        let beLength = 0
        for (let i = 0; i < res.length; i++) {
            const beQuizAnswers = res[i].QuizAnswers
            beLength += beQuizAnswers.length
        }

        if (feLength === beLength) {
            console.log('cập nhật câu hỏi và trả lời .')
        }
        if (feLength > beLength) {
            console.log('thêm câu trả lời mới.')
        }
        if (feLength < beLength) {
            console.log('xóa câu trả lời.')
        }
    }

    // ------------------------------------------ / Xóa câu hỏi
    if (questions.length < res.length) {
        console.log('Xoá câu hỏi ! ');

        let questionIdFe = questions.map((item) => {
            return item.id
        })

        let questionIdBe = res.map((item) => {
            return item.id
        })

        const allIdsFe = questionIdFe.flat();
        const allIdsBe = questionIdBe.flat();

        // tìm các id không trùng nhau trong hai mảng allIdsFe và allIdsBe
        const uniqueIds = allIdsBe.filter(id => !allIdsFe.includes(id));

        let deteleData = await db.QuizQuestions.findAll({
            attributes: ["audioUrl"],
            where: { id: uniqueIds },
            raw: true
        })

        if (deteleData) {
            console.log('check link audio data', deteleData);
            for (let i = 0; i < deteleData.length; i++) {
                if (deteleData[i].audioUrl) {
                    const AudioUrl = deteleData[i].audioUrl;
                    const public_id = AudioUrl.split('/').slice(-2).join('/').replace('.mp3', '');
                    console.log('check link audio  sau khi phân tích file', public_id);
                    cloudinary.uploader.destroy(public_id, { resource_type: 'video' }, function (error, result) {
                        if (error) {
                            console.log('Error:', error.message);
                        } else {
                            console.log('Result:', result);
                        }
                    });
                }
            }

        }

        await db.sequelize.transaction(async (t) => {
            await db.QuizQuestions.destroy({
                where: { id: uniqueIds },
                transaction: t,
            });

            await db.QuizAnswers.destroy({
                where: { question_id: uniqueIds },
                transaction: t,
            });
        });


        let feLength = 0
        for (let i = 0; i < questions.length; i++) {
            const feQuizAnswers = questions[i].QuizAnswers
            feLength += feQuizAnswers.length
        }
        console.log('feLength', feLength)

        let beLength = 0
        for (let i = 0; i < res.length; i++) {
            const beQuizAnswers = res[i].QuizAnswers
            beLength += beQuizAnswers.length
        }
        console.log('beLength', beLength)

        if (feLength === beLength) {
            console.log('cập nhật câu hỏi và trả lời .')
        }
        if (feLength > beLength) {
            console.log('thêm câu trả lời mới.')
        }
        if (feLength < beLength) {
            console.log('xóa câu trả lời.')
        }
    }

    return {
        EM: 'Update quiz question and answer success !',
        EC: 0,
        DT: [],
    }
}

module.exports = {
    postQuestionByAdminService_Image,
    postQuestionByAdminService_Audio,
    postQuizUpsertQAService,

}