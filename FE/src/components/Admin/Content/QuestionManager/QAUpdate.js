import React, { useEffect, useState } from 'react'
import Select from 'react-select';
import './QAUpdate.scss'
import { FcAddRow, FcDeleteRow } from 'react-icons/fc'
import { FaPlusCircle, FaMinusCircle } from 'react-icons/fa'
import { MdOutlineImageNotSupported, MdOutlineImage } from 'react-icons/md'
import { RiImageAddFill } from 'react-icons/ri'
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash'
import Lightbox from "react-awesome-lightbox";
import { getQuizsByAdmin, getQuizQAByAdmin, postUpsertQA } from '../../../../services/quizApiService'
import { toast } from 'react-toastify';

const QAUpdate = () => {
    const initQuestion = [
        {
            id: uuidv4(),
            description: '',
            image: '',
            imgName: '',
            QuizAnswers: [
                {
                    id: uuidv4(),
                    description: '',
                    correct_answer: false
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

    useEffect(() => {
        if (selectedQuiz && selectedQuiz.value) {
            fetchQuizWithQA()
        }
        // eslint-disable-next-line
    }, [selectedQuiz])

    //return a promise that resolves with a File instance
    function urltoFile(url, filename, mimeType) {
        return (fetch(url)
            .then(function (res) { return res.arrayBuffer(); })
            .then(function (buf) { return new File([buf], filename, { type: mimeType }); })
        );
    }

    const fetchQuizWithQA = async () => {
        let res = await getQuizQAByAdmin(selectedQuiz.value)
        if (res && res.EC === 0) {
            // promise bất đồng bộ ko dùng dc vòng lặp map / phải dùng vòng for
            let newQA = []
            for (let i = 0; i < res.DT.qa.length; i++) {
                let rawData = res.DT.qa[i]
                if (rawData.image) {
                    rawData.imgName = `question-${rawData.id}.png`
                    rawData.image = await urltoFile(`data:image/png;base64,${rawData.image}`, `question-${rawData.id}.png`, 'image/png')
                }
                newQA.push(rawData)
            }
            setQuestions(newQA)
        }
    }

    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
    });

    const handlePreviewImg = (questionId) => {
        console.log('questionId', questionId);
        console.log('questions', questions);
        let questionClone = _.cloneDeep(questions)
        let index = questionClone.findIndex(item => item.id === questionId)
        if (index > -1) {
            setDataImgPreview({
                url: URL.createObjectURL(questionClone[index].image),
                title: questionClone[index].imgName,
            })
            setIsPreviewImg(true)
        }
    }

    const handleChangeFileImg = async (questionId, event) => {
        let questionClone = _.cloneDeep(questions)
        let index = questionClone.findIndex(item => item.id === questionId)
        if (index > -1 && event.target && event.target.files && event.target.files[0]) {
            questionClone[index].image = event.target.files[0]
            questionClone[index].imgName = event.target.files[0].name
            setQuestions(questionClone)
        }
    }

    const fetchQuizByAdmin = async () => {
        let res = await getQuizsByAdmin()
        if (res && res.EC === 0) {
            let newQuiz = res.DT.map((item) => {
                return {
                    value: item.id,
                    label: `${item.id} - ${item.name}`
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
                image: '',
                imgName: '',
                QuizAnswers: [
                    {
                        id: uuidv4(),
                        description: '',
                        correct_answer: false
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
                correct_answer: false
            }
            let indexAnswer = questionClone.findIndex(item => item.id === questionId)
            questionClone[indexAnswer].QuizAnswers.push(newAnswer)
            setQuestions(questionClone)
        }
        if (type === 'Remove') {
            let indexAnswer = questionClone.findIndex(item => item.id === questionId)
            questionClone[indexAnswer].QuizAnswers = questionClone[indexAnswer].QuizAnswers.filter(item => item.id !== answerId)
            setQuestions(questionClone)
        }
    }

    const handleChangeQuestion = (type, questionId, value) => {
        if (type === 'Question') {
            let questionClone = _.cloneDeep(questions)
            let indexAnswer = questionClone.findIndex(item => item.id === questionId)
            if (indexAnswer > -1) {
                questionClone[indexAnswer].description = value
                setQuestions(questionClone)
            }
        }
    }


    const handleAnswerQuestion = (type, answerId, questionId, value) => {
        let questionClone = _.cloneDeep(questions)
        let index = questionClone.findIndex(item => item.id === questionId)
        if (index > -1) {
            questionClone[index].QuizAnswers =
                questionClone[index].QuizAnswers.map((answer) => {
                    if (answer.id === answerId) {
                        if (type === 'Checkbox') {
                            answer.correct_answer = value
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
            for (let j = 0; j < questions[i].QuizAnswers.length; j++) {
                if (!questions[i].QuizAnswers[j].description) {
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
        let isValidImage = true
        let indexImage = 0
        for (let i = 0; i < questions.length; i++) {
            if (!questions[i].imgName) {
                isValidImage = false
                indexImage = i
                break
            }
        }
        if (isValidImage === false) {
            toast.error(`Not empty image question ${indexImage + 1}`)
            return
        }


        let questionClone = _.cloneDeep(questions)
        for (let i = 0; i < questionClone.length; i++) {
            if (questionClone[i].image) {
                questionClone[i].image = await toBase64(questionClone[i].image)
            }
        }

        let res = await postUpsertQA({
            quizId: selectedQuiz.value,
            questions: questionClone
        })

        if (res && res.EC === 0) {
            toast.success(res.EM)
            fetchQuizWithQA()
        }
    }

    const [isPreviewImg, setIsPreviewImg] = useState(false)
    const [dataImgPreview, setDataImgPreview] = useState({
        title: '',
        url: ''
    })


    return (
        <div className='question-container'>
            <div className='add-new-question'>
                <div className='select-quiz form-group col-6'>
                    <label>
                        <b>Select quiz update :</b>
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
                                        <label htmlFor={`${question.id}`}>
                                            <RiImageAddFill className='icon-add-image ' />
                                        </label>
                                        <input type='file' hidden
                                            id={`${question.id}`}
                                            onChange={(event) => handleChangeFileImg(question.id, event)}
                                        />
                                        <span>{question.imgName
                                            ? <MdOutlineImage className='icon-rview1' onClick={() => handlePreviewImg(question.id)} />
                                            :
                                            <MdOutlineImageNotSupported className='icon-rview2' />}</span>
                                    </div>
                                    <div className='btn-add'>
                                        <FcAddRow className='add-icon'
                                            onClick={() => handleAddRemoveQuestion('Add', '')} />
                                        {questions.length > 1 && <FcDeleteRow className='delete-icon'
                                            onClick={() => handleAddRemoveQuestion('Remove', question.id)} />}

                                    </div>
                                </div>

                                {question.QuizAnswers && question.QuizAnswers.length > 0 && question.QuizAnswers.map((answer, index) => {
                                    return (
                                        <React.Fragment key={answer.id}>
                                            <div className='QuizAnswers-content'>
                                                <label><b>Answer {index + 1}</b></label>
                                                <input
                                                    className="check-answer form-check-input"
                                                    type="checkbox"
                                                    checked={answer.correct_answer}
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
                                                    {question.QuizAnswers.length > 1 && <FaMinusCircle
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

export default QAUpdate