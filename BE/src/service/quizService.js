import db from '../models/index';
import _ from 'lodash'

const getQuizService = async (userId) => {
    try {
        let data = await db.Quizs.findAll({
            attributes: ["id", "name", "description", "image", "difficulty"],
            include: [
                {
                    model: db.ParticipantQuizs,
                    where: {
                        participant_id: userId
                    }
                },
            ],
        });
        if (data) {
            return {
                EM: 'Get Quizs success !',
                EC: 0,
                DT: data,
            }
        } else {
            return {
                EM: 'Data Quizs empty !',
                EC: 0,
                DT: [],
            }
        }
    } catch (error) {
        console.log('Error from getQuizService:', error)
        return {
            EM: 'Error from getQuizService !',
            EC: 1,
            DT: [],
        }
    }
}

const getQuizQuestionService = async (id) => {
    try {
        let data = await db.QuizQuestions.findAll({
            attributes: ["id", "quiz_id", "image", "description"],
            where: { quiz_id: id },
            include: [
                {
                    model: db.QuizAnswers,
                },
            ],
        });
        if (data) {
            return {
                EM: 'Get Quiz Question success !',
                EC: 0,
                DT: data,
            }
        } else {
            return {
                EM: 'Data Quiz Question empty !',
                EC: 0,
                DT: [],
            }
        }
    } catch (error) {
        console.log('Error from getQuizQuestionService:', error)
        return {
            EM: 'Error from getQuizQuestionService !',
            EC: 1,
            DT: [],
        }
    }
}

const createQuizService = async (name, description, image, difficulty) => {
    try {
        await db.Quizs.create({
            name: name,
            description: description,
            image: image,
            difficulty: difficulty
        })
        return {
            EM: 'Create quiz success !',
            EC: 0,
            DT: [],
        }
    } catch (error) {
        console.log(">>> check error: ", error)
        return {
            EM: 'Error from createQuizService',
            EC: 1,
            DT: [],
        }
    }
}

const getQuizByAdminService = async () => {
    try {
        let quizs = await db.Quizs.findAll();
        if (quizs) {
            return {
                EM: 'Get quizs success !',
                EC: 0,
                DT: quizs,
            }
        } else {
            return {
                EM: 'Quizs data empty',
                EC: 0,
                DT: [],
            }
        }
    } catch (error) {
        console.log('error from getQuizByAdminService:', error)
        return {
            EM: 'error from getQuizByAdminService',
            EC: 1,
            DT: [],
        }
    }
}

const getQuizByAdminWithPaginService = async (page, limit) => {
    try {
        let offset = (page - 1) * limit;
        const count = await db.Quizs.count()
        const quizs = await db.Quizs.findAll({
            offset: offset,
            limit: limit,
            nest: true,
            order: [
                [db.sequelize.literal('CASE WHEN `Quizs`.`updatedAt` > `Quizs`.`createdAt` THEN `Quizs`.`updatedAt` ELSE `Quizs`.`createdAt` END DESC')]
            ],
        },)
        let totalPages = Math.ceil(count / limit)
        //console.log('totalRows - count : ', count)
        //console.log('totalPages', totalPages)
        let data = {
            totalRows: count,
            totalPages: totalPages,
            quizs: quizs
        }
        return {
            EM: 'Get quizs with pagination success !',
            EC: 0,
            DT: data,
        }
    } catch (error) {
        console.log('Error from getQuizByAdminWithPaginService :', error)
        return {
            EM: 'Error from getQuizByAdminWithPaginService !',
            EC: 1,
            DT: [],
        }
    }
}

const deleteQuizByAdminService = async (quizId) => {
    try {
        await db.Quizs.destroy({
            where: { id: quizId }
        });
        return {
            EM: 'Delete quiz success !',
            EC: 0,
            DT: [],
        }
    } catch (error) {
        console.log('Error from deleteQuizByAdminService:', error)
        return {
            EM: 'Error from deleteQuizByAdminService !',
            EC: 1,
            DT: [],
        }
    }
}

const updateQuizByAdminService = async (id, name, description, image, difficulty) => {
    try {
        await db.Quizs.update({
            name: name,
            description: description,
            image: image,
            difficulty: difficulty,
        }, { where: { id: id } })
        return {
            EM: 'Update quiz success !',
            EC: 0,
            DT: [],
        }
    } catch (error) {
        console.log(">>> Error from updateQuizByAdminService: ", error)
        return {
            EM: 'Error from updateQuizByAdminService',
            EC: 1,
            DT: [],
        }
    }
}

const postQuizAssginService = async (quizId, userId) => {
    try {
        let check = await db.ParticipantQuizs.findOne(
            {
                where: {
                    participant_id: userId,
                    quiz_id: quizId
                }
            }
        )
        if (check) {
            return {
                EM: 'The quiz already assigned to the user !',
                EC: -1,
                DT: [],
            }
        }
        let data = await db.ParticipantQuizs.create({
            participant_id: userId,
            quiz_id: quizId,
        })
        return {
            EM: 'Assign quiz to user success !',
            EC: 0,
            DT: data,
        }
    } catch (error) {
        console.log("Error from postQuizAssginService", error)
        return {
            EM: 'Error from postQuizAssginService',
            EC: 1,
            DT: [],
        }
    }
}

const getQuizQAService = async (quizId) => {
    try {
        let rawData = await db.QuizQuestions.findAll({
            attributes: ["id", "description", "image", "audioUrl"],
            where: { quiz_id: quizId },
            nest: true,
            include: [{
                attributes: ["id", "description", "correct_answer"],
                model: db.QuizAnswers,
            }]
        });

        let rawDataClone = _.cloneDeep(rawData)
        for (let i = 0; i < rawDataClone.length; i++) {
            if (rawDataClone[i].image) {
                const base64 = Buffer.from(rawDataClone[i].image).toString('base64');
                rawDataClone[i].image = base64
            }
        }

        let resData = {
            quizId: quizId,
            qa: rawDataClone
        };

        if (rawData) {
            return {
                EM: 'Get quiz success !',
                EC: 0,
                DT: resData,
            }
        } else {
            return {
                EM: 'Quizs data empty',
                EC: 0,
                DT: [],
            }
        }
    } catch (error) {
        console.log('error from getQuizQAService:', error)
        return {
            EM: 'error from getQuizQAService',
            EC: 1,
            DT: [],
        }
    }
}

module.exports = {
    getQuizService,
    getQuizQuestionService,
    createQuizService,
    getQuizByAdminService,
    getQuizByAdminWithPaginService,
    deleteQuizByAdminService,
    updateQuizByAdminService,
    postQuizAssginService,
    getQuizQAService
}