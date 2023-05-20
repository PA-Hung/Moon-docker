import React, { useState, useEffect } from 'react'
import { getQuizByUser } from '../../services/quizApiService'
import { Buffer } from 'buffer';
import './ListQuiz.scss'
import { useNavigate } from 'react-router-dom';

const ListQuiz = () => {
    const navigate = useNavigate()
    const [arrQuiz, setArrQuiz] = useState([])
    useEffect(() => {
        getQuizData()
    }, [])

    const getQuizData = async () => {
        let res = await getQuizByUser()
        if (res && res.EC === 0) {
            setArrQuiz(res.DT)
        }
    }

    return (
        <>
            <div className='list-quiz-container container'>
                {arrQuiz && arrQuiz.length > 0 && arrQuiz.map((quiz, index) => {
                    const base64String = Buffer.from(quiz.image).toString('base64');
                    return (
                        <div className="card"
                            style={{ width: '18rem' }}
                            key={`quiz-key-${index}`}>
                            <img className="card-img-top"
                                width={300}
                                height={300}
                                src={`data:image/jpeg;base64,${base64String}`}
                                alt="quiz-img" />
                            <div className="card-body">
                                <div>
                                    <h5 className="card-title">Quiz {index + 1} - {quiz.name}</h5>
                                </div>
                                <div>
                                    <p className="card-text">{quiz.description}</p>
                                </div>
                                <div>
                                    <button className="btn btn-primary"
                                        onClick={() => navigate(`/quiz/${quiz.id}`, { state: { quizTitle: quiz.description } })}
                                    >Start Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
                })}
                {arrQuiz && arrQuiz.length === 0 &&
                    <div>You don't have any quiz now ... !</div>
                }
            </div>
        </>
    )
}

export default ListQuiz