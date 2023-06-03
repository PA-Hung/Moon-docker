import React from 'react'
import { Modal, Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const ModalQuizResult = (props) => {
    const navigate = useNavigate()
    const { showModalQuizResult, setShowModalQuizResult, dataModalResult } = props
    const handleCancel = () => {
        setShowModalQuizResult(false);
    };

    const ShowResultDetails = () => {
        navigate('/user')
    }

    return (
        <div>
            <Modal
                title='Your quiz result :'
                open={showModalQuizResult}
                onOk={ShowResultDetails}
                onCancel={handleCancel}
                width={350}
                footer={[
                    <Button key="submit" type="primary" onClick={ShowResultDetails}>
                        Close
                    </Button>,
                ]}
            >
                <div>Total Questions : <b>{dataModalResult.countTotal}</b></div>
                <div>Total Correct Answers : <b>{dataModalResult.countCorrect}</b></div>
            </Modal>
        </div>
    )
}

export default ModalQuizResult