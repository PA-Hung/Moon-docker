import React, { useEffect } from 'react'
import { useParams, useLocation, NavLink } from 'react-router-dom'
import { getQuizQuestion } from '../../services/quizApiService'
import './DetailQuiz.scss'
import Question from './Question'
import { useState } from 'react'
import _ from 'lodash'
import CountDown from './CountDown/CountDown'
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { postSubmitQuiz } from '../../services/userApiService'
import { toast } from 'react-toastify'
import ModalQuizResult from './ModalQuizResult'

const DetailQuiz = (props) => {
    const params = useParams()
    const quizId = params.id
    const location = useLocation()
    const [dataQuiz, setDataQuiz] = useState([])
    const [currentQuiz, setCurrentQuiz] = useState(0)
    const [showModalQuizResult, setShowModalQuizResult] = useState(false)
    const [dataModalResult, setDataModalResult] = useState({})
    const [isRunning, setIsRunning] = useState(true);

    useEffect(() => {
        const fetchQuestion = async () => {
            let res = await getQuizQuestion(quizId)
            if (res && res.EC === 0) {
                let data = res.DT
                const newData = data.map(itemQ => ({
                    ...itemQ,
                    QuizAnswers: itemQ.QuizAnswers.map(itemA => ({
                        ...itemA,
                        isSelected: false
                    }))
                }));
                setDataQuiz(newData);
            }
        }
        fetchQuestion()
    }, [quizId])


    const handlePrev = () => {
        if (currentQuiz - 1 < 0) return;
        setCurrentQuiz(currentQuiz - 1)
    }

    const handleNext = () => {
        if (dataQuiz && dataQuiz.length > currentQuiz + 1)
            setCurrentQuiz(currentQuiz + 1)
    }

    const handleFinish = async () => {
        let payload = {
            quizId: +quizId,
            answers: []
        }
        let answers = []
        if (dataQuiz && dataQuiz.length > 0) {
            dataQuiz.forEach((question) => {
                let questionId = question.id
                let userAnswerId = []
                question.QuizAnswers.forEach((answer) => {
                    if (answer.isSelected === true) {
                        userAnswerId.push(answer.id)
                    }
                })
                answers.push({
                    questionId: +questionId,
                    userAnswerId: userAnswerId
                })
            })
        }
        payload.answers = answers
        let res = await postSubmitQuiz(payload)
        if (res && res.EC === 0) {
            setShowModalQuizResult(true)
            setIsRunning(false)
            setDataModalResult({
                countCorrect: res.DT.countCorrect,
                countTotal: res.DT.countTotal,
                quizData: res.DT.quizData
            })
        } else {
            toast.error(res.EM)
        }
        //console.log('>>>>>> check payload: ', payload);
        //console.log('>>>>>> check res: ', res);
    }

    const handleCheckboxParent = (answerId, questionId) => {
        let dataQuizClone = _.cloneDeep(dataQuiz)
        let question = dataQuizClone.find(item => item.id === +questionId)
        if (question && question.QuizAnswers) {
            let newAnswer = question.QuizAnswers.map(item => {
                if (+item.id === answerId) {
                    item.isSelected = !item.isSelected
                }
                return item
            });
            question.QuizAnswers = newAnswer
        }
        let index = dataQuizClone.findIndex(item => item.id === +questionId)
        if (index > -1) {
            dataQuizClone[index] = question
            setDataQuiz(dataQuizClone)
        }
    }

    return (
        <>
            <Breadcrumb className='quiz-detail-header'>
                <NavLink to='/' className='breadcrumb-item'>
                    Home
                </NavLink>
                <NavLink to='/user' className='breadcrumb-item'>
                    My quizs
                </NavLink>
                <Breadcrumb.Item active>Doing quiz</Breadcrumb.Item>
            </Breadcrumb>
            <div className='detail-quiz-container'>
                <div className='left-content'>
                    <div className='title'>Quiz {quizId} : {location?.state?.quizTitle}</div>
                    <div className='question-content'>
                        <Question
                            data={dataQuiz && dataQuiz.length > 0 ? dataQuiz[currentQuiz] : []}
                            currentQuiz={currentQuiz}
                            handleCheckboxParent={handleCheckboxParent}
                        />
                    </div>
                    <div className='question-footer'>
                        <button className='btn btn-danger' onClick={() => handlePrev()}>Prev</button>
                        <button className='btn btn-primary' onClick={() => handleNext()}>Next</button>
                        <button className='btn btn-warning' onClick={() => handleFinish()}>Finish</button>
                    </div>

                </div>
                <div className='right-content'>
                    <CountDown
                        setIsRunning={setIsRunning}
                        isRunning={isRunning}
                        setCurrentQuiz={setCurrentQuiz}
                        dataQuiz={dataQuiz}
                        handleFinish={handleFinish} />
                </div>
            </div>
            <ModalQuizResult
                showModalQuizResult={showModalQuizResult}
                setShowModalQuizResult={setShowModalQuizResult}
                dataModalResult={dataModalResult}
            />
        </>
    )
}

export default DetailQuiz