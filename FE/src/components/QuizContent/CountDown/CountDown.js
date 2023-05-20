import React, { useRef } from 'react'
import Timer from './Timer'
import { toast } from 'react-toastify'


const CountDown = (props) => {
    const { dataQuiz, handleFinish, setCurrentQuiz, isRunning, setIsRunning } = props

    const refDiv = useRef([])

    const onTimesUp = () => {
        toast.success('You have run out of time !')
        handleFinish()
        setIsRunning(false)
    }
    const getClassQuestion = (question) => {
        if (question && question.QuizAnswers && question.QuizAnswers.length > 0) {
            let isAnswered = question.QuizAnswers.find(a => a.isSelected === true)
            if (isAnswered) {
                return 'numberQ selected'
            }
        }
        return 'numberQ'
    }

    const handleClickNumberQuestion = (question, index) => {
        setCurrentQuiz(index)
        if (refDiv.current) {
            refDiv.current.forEach(item => {
                if (item && item.className === 'numberQ clicked') {
                    item.className = 'numberQ'
                }
            })
        }
        if (question && question.QuizAnswers && question.QuizAnswers.length > 0) {
            let isAnswered = question.QuizAnswers.find(a => a.isSelected === true)
            if (isAnswered) {
                return
            }
        }
        refDiv.current[index].className = 'numberQ clicked'
    }

    return (
        <>
            <div className='timer'>
                <Timer
                    isRunning={isRunning}
                    setIsRunning={setIsRunning}
                    onTimesUp={onTimesUp} />
            </div>
            <div className='questions'>
                {dataQuiz && dataQuiz.length > 0 && dataQuiz.map((item, index) => {
                    return (
                        <div
                            key={`q-${index}`}
                            className={getClassQuestion(item, index)}
                            onClick={() => handleClickNumberQuestion(item, index)}
                            ref={element => refDiv.current[index] = element}
                        >{index + 1}</div>
                    )
                })}
            </div>
        </>
    )
}

export default CountDown