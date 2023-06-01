import React from 'react'
import { Modal } from 'antd';
import dayjs from 'dayjs';

const ModalHistoryByID = (props) => {
    const { showModalHistoryByID, setShowModalHistoryByID, userHistoryByID, setUserHistoryByID } = props
    const handleCancel = () => {
        setShowModalHistoryByID(false);
        setUserHistoryByID([])
    };

    return (
        <div>
            <Modal
                title='HISTORY QUIZS'
                open={showModalHistoryByID}
                onCancel={handleCancel}
                width={780}
                bodyStyle={{ maxHeight: "400px", overflow: "auto" }}
                okButtonProps={{ style: { display: 'none' } }}
                cancelText="Close"
            >
                <form>
                    <div className="history-form-byID">
                        <table className="table table-bordered">
                            <thead class="table-info"
                                style={{ display: "table-header-group", position: "sticky", top: "0" }}
                            >
                                <tr >
                                    <th scope="col">ID</th>
                                    <th scope="col">Quiz Name</th>
                                    <th scope="col">Total Question</th>
                                    <th scope="col">Total Correct</th>
                                    <th scope="col">Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {userHistoryByID && userHistoryByID.length > 0
                                    && userHistoryByID.map((itemQ, indexQ) => {
                                        return itemQ.Historys.map((itemH, indexH) => {
                                            return (
                                                <tr key={`table-history-key-byID-${indexH}`}>
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

                                {userHistoryByID && userHistoryByID.length === 0 &&
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

export default ModalHistoryByID