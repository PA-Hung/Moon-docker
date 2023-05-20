import React, { useEffect, useState } from 'react'
import { Modal } from 'antd';
import { getUserHistory } from '../../services/userApiService';
//import { toast } from 'react-toastify';
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';

const ModalHistory = (props) => {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
    const { showModalHistory, setShowModalHistory } = props
    const [userHistory, setUserHistory] = useState([])
    const handleCancel = () => {
        setShowModalHistory(false);
    };

    const fetchUserHistory = async () => {
        let res = await getUserHistory()
        if (res && res.EC === 0) {
            setUserHistory(res.DT)
        }
        // else {
        //     toast.error(res.EM)
        // }
    }

    useEffect(() => {
        if (isAuthenticated) {
            fetchUserHistory()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div>
            <Modal
                title='HISTORY QUIZS'
                open={showModalHistory}
                onCancel={handleCancel}
                width={900}
                okButtonProps={{ style: { display: 'none' } }}
            >
                <form>
                    <div className="history-form">
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">Quiz Name</th>
                                    <th scope="col">Total Question</th>
                                    <th scope="col">Total Correct</th>
                                    <th scope="col">Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {userHistory && userHistory.length > 0
                                    && userHistory.map((itemQ, indexQ) => {
                                        return itemQ.Historys.map((itemH, indexH) => {
                                            return (
                                                <tr key={`table-history-key-${indexH}`}>
                                                    <td>{itemQ.id}</td>
                                                    <td>{itemQ.name}</td>
                                                    <td>{itemH.total_questions}</td>
                                                    <td>{itemH.total_correct}</td>
                                                    <td>
                                                        {dayjs(itemH.createdAt).format('DD/MM/YYYY - HH:mm:ss A')}
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    })}

                                {userHistory && userHistory.length === 0 &&
                                    <tr>
                                        <td colSpan="5">History not found !</td>
                                    </tr>
                                }
                            </tbody>
                        </table>
                    </div>
                </form>
            </Modal>
        </div>
    )
}

export default ModalHistory