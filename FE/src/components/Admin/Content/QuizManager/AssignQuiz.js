import React, { useEffect, useState } from 'react'
import './AssignQuiz.scss'
import Select from 'react-select';
import { getQuizsByAdmin } from '../../../../services/quizApiService'
import { toast } from 'react-toastify';
import { getAllUser, postAssignQuiz } from '../../../../services/adminApiService'

const AssignQuiz = () => {
    const [listQuiz, setListQuiz] = useState([])
    const [selectedQuiz, setSelectedQuiz] = useState([])

    const [listUser, setListUser] = useState([])
    const [selectedUser, setSelectedUser] = useState([])

    useEffect(() => {
        fetchQuizByAdmin()
        fetchListUser()
        // eslint-disable-next-line
    }, [])

    const fetchListUser = async () => {
        let res = await getAllUser()
        if (res && res.EC === 0) {
            let newUser = res.DT.map((item) => {
                return {
                    value: item.id,
                    label: `${item.id} - ${item.username}`
                }
            })
            setListUser(newUser)
        } else {
            toast.error(res.EM)
        }
    }

    const fetchQuizByAdmin = async () => {
        let res = await getQuizsByAdmin()
        //console.log(res);
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

    const handleAssign = async () => {
        let res = await postAssignQuiz(selectedQuiz.value, selectedUser.value)
        if (res && res.EC === 0) {
            toast.success(res.EM)
        } else {
            toast.error(res.EM)
        }
    }

    return (
        <div className='assign-quiz-container row'>
            <div className='select-quiz form-group col-6'>
                <label>
                    <b>Select Quiz :</b>
                </label>
                <Select
                    className='select'
                    defaultValue={selectedQuiz}
                    onChange={setSelectedQuiz}
                    options={listQuiz}
                />
            </div>
            <div className='select-user form-group col-6'>
                <label>
                    <b>Select User :</b>
                </label>
                <Select
                    className='select'
                    defaultValue={selectedUser}
                    onChange={setSelectedUser}
                    options={listUser}
                />
            </div>
            <div className='mt-3'>
                <button
                    onClick={() => handleAssign()}
                    className='btn btn-primary'>Assgin</button>
            </div>
        </div>
    )
}

export default AssignQuiz