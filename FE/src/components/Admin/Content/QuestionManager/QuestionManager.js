import React, { useEffect, useState } from 'react'
import Select from 'react-select';
import './QuestionManager.scss'
import { FcAddRow, FcDeleteRow } from 'react-icons/fc'
import { FaPlusCircle, FaMinusCircle } from 'react-icons/fa'
import { RiImageAddFill } from 'react-icons/ri'
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash'
import Lightbox from "react-awesome-lightbox";
import { getQuizsByAdmin } from '../../../../services/quizApiService'
import { postQuestionQuizByAdmin, postAnswerQuestionByAdmin }
    from '../../../../services/questionApiSerices'
import { toast } from 'react-toastify';
import { MdOutlineImageNotSupported, MdOutlineImage } from 'react-icons/md'


const QuestionManager = () => {
    const initQuestion = [
        {
            id: uuidv4(),
            description: '',
            imgFile: '',
            imgName: '',
            audioUrl: '',
            answers: [
                {
                    id: uuidv4(),
                    description: '',
                    isCorrect: false
                }
            ]
        }
    ]
    const [questions, setQuestions] = useState(initQuestion)
    const [listQuiz, setListQuiz] = useState([])
    const [selectedQuiz, setSelectedQuiz] = useState([])

    useEffect(() => {
        fetchQuizByAdmin()
        // eslint-disable-next-line
    }, [])

    const fetchQuizByAdmin = async () => {
        let res = await getQuizsByAdmin()
        //console.log(res);
        if (res && res.EC === 0) {
            let newQuiz = res.DT.map((item) => {
                return {
                    value: item.id,
                    label: `${item.id} - ${item.name} - (${item.difficulty})`
                }
            })
            setListQuiz(newQuiz)
        } else {
            toast.error(res.EM)
        }
    }

    const handleAddRemoveQuestion = (type, id) => {
        if (type === 'Add') {
            const newQuestion = {
                id: uuidv4(),
                description: '',
                imgFile: '',
                imgName: '',
                audioUrl: '',
                answers: [
                    {
                        id: uuidv4(),
                        description: '',
                        isCorrect: false
                    }
                ]
            }
            setQuestions([...questions, newQuestion])
        }
        if (type === 'Remove') {
            let questionClone = _.cloneDeep(questions)
            questionClone = questionClone.filter(item => item.id !== id)
            setQuestions(questionClone)
        }
    }

    const handleAddRemoveAnswer = (type, questionId, answerId) => {
        let questionClone = _.cloneDeep(questions)
        if (type === 'Add') {
            const newAnswer =
            {
                id: uuidv4(),
                description: '',
                isCorrect: false
            }
            let indexAnswer = questionClone.findIndex(item => item.id === questionId)
            questionClone[indexAnswer].answers.push(newAnswer)
            setQuestions(questionClone)
        }
        if (type === 'Remove') {
            let indexAnswer = questionClone.findIndex(item => item.id === questionId)
            questionClone[indexAnswer].answers = questionClone[indexAnswer].answers.filter(item => item.id !== answerId)
            setQuestions(questionClone)
        }
    }

    const handleChangeQuestion = (type, questionId, value) => {
        if (type === 'Question') {
            let questionClone = _.cloneDeep(questions)
            let index = questionClone.findIndex(item => item.id === questionId)
            if (index > -1) {
                questionClone[index].description = value
                setQuestions(questionClone)
            }
        }
    }

    const handleChangeFileImage = async (questionId, event) => {
        let questionClone = _.cloneDeep(questions);
        let index = questionClone.findIndex(item => item.id === questionId);
        if (index > -1 && event.target && event.target.files && event.target.files[0]) {
            if (event.target.files[0].type === "audio/mpeg") {
                questionClone[index].audioUrl = URL.createObjectURL(event.target.files[0]);
                questionClone[index].image = "";
                questionClone[index].imgName = ""
            }
            if (event.target.files[0].type === "image/jpeg") {
                questionClone[index].image = event.target.files[0];
                questionClone[index].imgName = event.target.files[0].name;
                questionClone[index].audioUrl = "";
            }
            setQuestions(questionClone);
        }
    }

    const handleAnswerQuestion = (type, answerId, questionId, value) => {
        let questionClone = _.cloneDeep(questions)
        let index = questionClone.findIndex(item => item.id === questionId)
        if (index > -1) {
            questionClone[index].answers =
                questionClone[index].answers.map((answer) => {
                    if (answer.id === answerId) {
                        if (type === 'Checkbox') {
                            answer.isCorrect = value
                        }
                        if (type === 'Input') {
                            answer.description = value
                        }
                    }
                    return answer
                })
            setQuestions(questionClone)
        }
    }

    const handleSubmitQuestion = async () => {
        // validate select quiz
        if (_.isEmpty(selectedQuiz)) {
            toast.error('Please choose a Quiz !')
            return
        }
        // validate answer
        let isValidAnswer = true
        let indexQ = 0
        let indexA = 0
        for (let i = 0; i < questions.length; i++) {
            for (let j = 0; j < questions[i].answers.length; j++) {
                if (!questions[i].answers[j].description) {
                    isValidAnswer = false;
                    indexA = j
                    break;
                }
            }
            indexQ = i
            if (isValidAnswer === false) break;
        }
        if (isValidAnswer === false) {
            toast.error(`Not empty Answer ${indexA + 1} at Question ${indexQ + 1}`)
            return
        }

        // validate question
        let isValidQuestion = true
        let indexQuestion = 0
        for (let i = 0; i < questions.length; i++) {
            if (!questions[i].description) {
                isValidQuestion = false
                indexQuestion = i
                break
            }
        }
        if (isValidQuestion === false) {
            toast.error(`Not empty description question ${indexQuestion + 1}`)
            return
        }

        // validate select image
        // let isValidImage = true
        // let indexImage = 0
        // for (let i = 0; i < questions.length; i++) {
        //     if (!questions[i].imgName) {
        //         isValidImage = false
        //         indexImage = i
        //         break
        //     }
        // }
        // if (isValidImage === false) {
        //     toast.error(`Not empty image question ${indexImage + 1}`)
        //     return
        // }

        // tạo câu hỏi
        for (const question of questions) {
            const resQuestion = await postQuestionQuizByAdmin(
                +selectedQuiz.value,
                question.description,
                question.imgFile)
            console.log('>>>', question.imgFile);
            // tạo câu trả lời
            for (const answer of question.answers) {
                await postAnswerQuestionByAdmin(
                    +resQuestion.DT.id,
                    answer.description,
                    answer.isCorrect)
            }
        }

        toast.success('Create question and answer success !')
        setQuestions(initQuestion)
    }

    const [isPreviewImg, setIsPreviewImg] = useState(false)
    const [dataImgPreview, setDataImgPreview] = useState({
        title: '',
        url: ''
    })

    const handlePreviewImg = (questionId) => {
        let questionClone = _.cloneDeep(questions)
        let index = questionClone.findIndex(item => item.id === questionId)
        if (index > -1) {
            setDataImgPreview({
                title: questionClone[index].imgName,
                url: URL.createObjectURL(questionClone[index].imgFile)
            })
            setIsPreviewImg(true)
        }
    }

    return (
        <div className='question-container'>
            <div className='add-new-question'>
                <div className='select-quiz form-group col-6'>
                    <label>
                        <b>Select quiz create new answer :</b>
                    </label>
                    <Select
                        className='select'
                        defaultValue={selectedQuiz}
                        onChange={setSelectedQuiz}
                        options={listQuiz}
                    />
                </div>
                <div className='mt-3'>
                    <b>Add question :</b>
                </div>

                {questions && questions.length > 0 && questions.map((question, index) => {
                    return (
                        <React.Fragment key={question.id}>
                            <div className='question-main my-4'>
                                <div className='question-content'>
                                    <label >
                                        <b>Question {index + 1}</b>
                                    </label>
                                    <div className="description">
                                        <input type="text"
                                            defaultValue={question.description}
                                            onChange={
                                                (event) => handleChangeQuestion('Question', question.id, event.target.value)}
                                            className="form-control"
                                            placeholder="Description" />
                                    </div>
                                    <div className='group-upload'>
                                        <div>
                                            <label htmlFor={`${question.id}`}>
                                                <RiImageAddFill className='icon-add-image ' />
                                            </label>
                                            <input type='file' hidden accept="audio/*,image/*"
                                                id={`${question.id}`}
                                                onChange={(event) => handleChangeFileImage(question.id, event)}
                                            />
                                        </div>
                                        <div>
                                            {question.image || question.audioUrl ?
                                                <>
                                                    {
                                                        question.image
                                                            ? <MdOutlineImage className='icon-rview1' onClick={() => handlePreviewImg(question.id)} />
                                                            :
                                                            <>
                                                                <audio controls src={question.audioUrl} />
                                                            </>
                                                    }
                                                </>
                                                : <MdOutlineImageNotSupported className='icon-rview2' />
                                            }

                                        </div>
                                        <div className='btn-add'>
                                            <FcAddRow className='add-icon'
                                                onClick={() => handleAddRemoveQuestion('Add', '')} />
                                            {questions.length > 1 && <FcDeleteRow className='delete-icon'
                                                onClick={() => handleAddRemoveQuestion('Remove', question.id)} />}
                                        </div>
                                    </div>

                                </div>

                                {question.answers && question.answers.length > 0 && question.answers.map((answer, index) => {
                                    return (
                                        <React.Fragment key={answer.id}>
                                            <div className='answers-content'>
                                                <label><b>Answer {index + 1}</b></label>
                                                <input
                                                    className="check-answer form-check-input"
                                                    type="checkbox"
                                                    checked={answer.isCorrect}
                                                    onChange={(event) =>
                                                        handleAnswerQuestion('Checkbox', answer.id, question.id, event.target.checked)}
                                                />
                                                <div className="answer-text">
                                                    <input type="text"
                                                        onChange={(event) =>
                                                            handleAnswerQuestion('Input', answer.id, question.id, event.target.value)}
                                                        defaultValue={answer.description}
                                                        className="form-control"

                                                        placeholder="Description" />

                                                </div>
                                                <div className='btn-answer'>
                                                    <FaPlusCircle
                                                        onClick={() => handleAddRemoveAnswer('Add', question.id)}
                                                        className='add-answer' />
                                                    {question.answers.length > 1 && <FaMinusCircle
                                                        onClick={() => handleAddRemoveAnswer('Remove', question.id, answer.id)}
                                                        className='delete-answer' />}

                                                </div>
                                            </div>
                                        </React.Fragment>
                                    )
                                })}
                            </div>
                        </React.Fragment>
                    )
                })}

                {questions && questions.length > 0 &&
                    <div>
                        <button
                            onClick={() => handleSubmitQuestion()}
                            className='btn btn-primary'>Save question</button>
                    </div>
                }
            </div>
            {isPreviewImg === true && <Lightbox
                image={dataImgPreview.url}
                title={dataImgPreview.title}
                onClose={() => setIsPreviewImg(false)}
            />}
        </div>
    )
}

export default QuestionManager