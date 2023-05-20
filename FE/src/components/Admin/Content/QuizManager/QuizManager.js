import React from 'react'
import { useState } from 'react';
import Select from 'react-select';
import { postCreateNewQuiz } from '../../../../services/quizApiService'
import { toast } from 'react-toastify';
import Accordion from 'react-bootstrap/Accordion';
import './QuizManager.scss'
import TableQuiz from './TableQuiz';
import { useEffect } from 'react';
import { getQuizsByAdminWithPagin } from '../../../../services/quizApiService'
import { QuizModalUpdate } from './QuizModalUpdate';
import { DiffTwoTone } from '@ant-design/icons';

const options = [
    { value: 'Easy', label: 'Easy' },
    { value: 'Medium', label: 'Medium' },
    { value: 'Hard', label: 'Hard' },
];

const QuizManager = () => {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [type, setType] = useState('Easy')
    const [image, setImage] = useState(null)
    const [listQuizs, setListQuizs] = useState([])
    const [showModalUpdateQuiz, setShowModalUpdateQuiz] = useState(false);
    const [quizInfoUpdate, setQuizInfoUpdate] = useState([])
    // Pagination User ------------------------------
    // eslint-disable-next-line
    const [currentLitmit, setCurrentLimit] = useState(10)
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0)
    // Pagination User ------------------------------

    const defaultValidInput = {
        isValidName: true,
    }
    const [ojbCheckInput, setOjbCheckInput] = useState(defaultValidInput)

    const isValidInputs = () => {
        setOjbCheckInput(defaultValidInput);
        if (!name) {
            toast.error('Name quiz is required !')
            setOjbCheckInput({ ...defaultValidInput, isValidName: false })
            return false
        }
        return true
    }

    useEffect(() => {
        fetchQuizByAdmin()
        // eslint-disable-next-line
    }, [currentPage])

    const fetchQuizByAdmin = async () => {
        let res = await getQuizsByAdminWithPagin(currentPage, currentLitmit)
        //console.log('res', res);
        if (res && res.EC === 0) {
            setTotalPages(res.DT.totalPages)
            if (res.DT.totalPages > 0 && res.DT.quizs.length === 0) {
                setCurrentPage(res.DT.totalPages)
            }
            if (res.DT.totalPages > 0 && res.DT.quizs.length > 0) {
                setListQuizs(res.DT.quizs)
            }
        } else {
            toast.error(res.EM)
        }
    }

    const handleUploadImage = (event) => {
        console.log(event.target.files[0])
        if (event.target && event.target.files && event.target.files[0]) {
            setImage(event.target.files[0])
        }
    }
    const handleSave = async () => {
        let check = isValidInputs()
        if (check === true) {
            let res = await postCreateNewQuiz(name, description, type?.value, image)
            if (res && res.EC === 0) {
                toast.success(res.EM)
                setName('')
                setDescription('')
                setImage(null)
                fetchQuizByAdmin()
            } else {
                toast.error(res.EM)
            }
        }
    }

    return (
        <div className='quiz-container'>
            <div className='add-quiz-container'>
                <Accordion  >
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>
                            <DiffTwoTone
                                className='mx-2'
                                style={{ fontSize: '24px' }} /><b>Add new quiz : </b>
                        </Accordion.Header>
                        <Accordion.Body>
                            <div className="form-floating mb-3">
                                <input type="text"
                                    className={ojbCheckInput.isValidName
                                        ? 'Input-username form-control'
                                        : 'Input-username form-control is-invalid'}
                                    id="floatingTitle"
                                    placeholder="Quiz title"
                                    value={name} onChange={(event) => setName(event.target.value)}
                                />
                                <label htmlFor="floatingTitle">Title quiz</label>
                            </div>
                            <div className="form-floating">
                                <input type="text" className="form-control" id="floatingDescription"
                                    placeholder="Description"
                                    value={description} onChange={(event) => setDescription(event.target.value)}
                                />
                                <label htmlFor="floatingDescription">Description</label>
                            </div>
                            <div className='my-3'>
                                <Select
                                    onChange={setType}
                                    defaultValue={type}
                                    options={options}
                                    placeholder={'Quiz type ... '}
                                />
                            </div>
                            <div className='more-actions'>
                                <label className='mb-1'>Upload Image</label>
                                <input type='file' className='form-control'
                                    onChange={(event) => handleUploadImage(event)}
                                />
                            </div>
                            <div className='mt-3 d-flex justify-content-end'>
                                <button className='btn btn-primary'
                                    onClick={() => handleSave()}
                                >Save</button>
                            </div>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </div>
            <hr />
            <div className='list-quizs'>
                <TableQuiz
                    listQuizs={listQuizs}
                    setCurrentPage={setCurrentPage}
                    totalPages={totalPages}
                    currentPage={currentPage}
                    currentLitmit={currentLitmit}
                    fetchQuizByAdmin={fetchQuizByAdmin}
                    showModalUpdateQuiz={showModalUpdateQuiz}
                    setShowModalUpdateQuiz={setShowModalUpdateQuiz}
                    setQuizInfoUpdate={setQuizInfoUpdate}
                />
            </div>
            <QuizModalUpdate
                showModalUpdateQuiz={showModalUpdateQuiz}
                setShowModalUpdateQuiz={setShowModalUpdateQuiz}
                quizInfoUpdate={quizInfoUpdate}
                fetchQuizByAdmin={fetchQuizByAdmin}
            />
        </div>
    )
}

export default QuizManager