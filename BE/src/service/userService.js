import bcrypt from 'bcryptjs';
import db from '../models/index';
const salt = bcrypt.genSaltSync(10);

const hashUserPassword = (userPassword) => {
    let hashPassword = bcrypt.hashSync(userPassword, salt);
    return hashPassword;
}

const checkPassword = (inputPassword, hashPassword) => {
    return bcrypt.compareSync(inputPassword, hashPassword); // true
}

const getUserProfileService = async (userId) => {
    try {
        let data = await db.Participants.findOne({
            attributes: ["id", "username", "email", "image"],
            where: {
                id: userId
            }
        });
        if (data) {
            return {
                EM: 'Get User Profile Success !',
                EC: 0,
                DT: data,
            }
        } else {
            return {
                EM: 'Data User Profile Empty !',
                EC: 0,
                DT: [],
            }
        }

    } catch (error) {
        console.log('Error from getUserProfileService:', error)
        return {
            EM: 'Error from getUserProfileService !',
            EC: 1,
            DT: [],
        }
    }
}

const getHistoryService = async (userId) => {
    try {
        let data = await db.Quizs.findAll({
            include: [
                {
                    model: db.Historys,
                    where: {
                        participant_id: userId
                    }
                },
            ],
        });
        if (data) {
            return {
                EM: 'Get User History Success !',
                EC: 0,
                DT: data,
            }
        } else {
            return {
                EM: 'Data User History Empty !',
                EC: 0,
                DT: [],
            }
        }

    } catch (error) {
        console.log('Error from getHistoryService:', error)
        return {
            EM: 'Error from getHistoryService !',
            EC: 1,
            DT: [],
        }
    }
}

const arrayEqual = (a, b) => {
    return Array.isArray(a) && Array.isArray(b)
        && a.length === b.length && a.every((val, index) => val === b[index]);
}

const postQuizSubmitService = async (userId, quizId, answers) => {
    try {
        let res = await db.QuizQuestions.findAll({
            attributes: ["id", "quiz_id"],
            where: { quiz_id: quizId },
            raw: true,
            nest: true,
            include: [
                {
                    model: db.QuizAnswers,
                    attributes: ["id", "question_id", "correct_answer"],
                },
            ],
        })

        const quizData = [];
        let countCorrect = 0;
        let countTotal = answers.length;

        answers.forEach((answer) => {
            const questionId = answer.questionId;
            const userAnswerIds = answer.userAnswerId;
            // Lọc các bản ghi có quiz_id và question_id phù hợp và đáp án đúng (correct_answer = 1)
            const questionAnswers = res.filter((record) => {
                return record.QuizAnswers.question_id === questionId
                    && record.QuizAnswers.correct_answer === 1;
            });
            // Lấy ra mảng các đáp án đúng từ các bản ghi lọc được ở trên
            const systemAnswerIds = questionAnswers.map((record) => record.QuizAnswers.id);
            const isCorrect = arrayEqual(userAnswerIds, systemAnswerIds);

            quizData.push({
                questionId: questionId,
                isCorrect: isCorrect,
                userAnswers: userAnswerIds,
                systemAnswers: systemAnswerIds
            });

            if (isCorrect) {
                countCorrect++;
            }
        });

        await db.Historys.create({
            participant_id: userId,
            quiz_id: quizId,
            total_questions: countTotal,
            total_correct: countCorrect
        })

        return {
            DT: {
                quizData: quizData,
                countCorrect: countCorrect,
                countTotal: countTotal
            },
            EC: 0,
            EM: "Submit the quiz succeed !"
        }

    } catch (error) {
        console.log('Error from postQuizSubmitService:', error)
        return {
            EM: 'Error from postQuizSubmitService !',
            EC: 1,
            DT: [],
        }
    }
}

const updateProfileService = async (id, username, email, oldPassword, newPassword, image) => {
    try {
        let hashNewPassword = hashUserPassword(newPassword);
        let userDB = await db.Participants.findOne({
            where: { id: id }
        })

        if (userDB) {
            let isCorrectPassword = checkPassword(oldPassword, userDB.password)
            if (isCorrectPassword === true) {
                await db.Participants.update(
                    {
                        email: email,
                        username: username,
                        password: hashNewPassword,
                        image: image
                    },
                    {
                        where: { id: id }
                    }
                )
            } else {
                return {
                    EM: 'Your old password is not correct !',
                    EC: -1,
                    DT: [],
                }
            }
        }

        return {
            EM: 'Update user profile success and you need to login again to update your profile !',
            EC: 0,
            DT: [],
        }

    } catch (error) {
        console.log(">>> check error: ", error)
        return {
            EM: 'Error from updateProfileService ',
            EC: 1,
            DT: [],
        }
    }
}

module.exports = {
    getUserProfileService,
    getHistoryService,
    postQuizSubmitService,
    updateProfileService
}