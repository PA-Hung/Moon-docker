import React, { useEffect, useState } from 'react'
import { Modal } from 'antd';
import './QuizModalUpdate.scss'
import { FcPlus } from 'react-icons/fc';
import _ from 'lodash'
import { toast } from 'react-toastify';
import { putUpdateQuizByAdmin } from '../../../../services/quizApiService'
import { Buffer } from 'buffer';

export const QuizModalUpdate = (props) => {
    const { showModalUpdateQuiz, setShowModalUpdateQuiz, quizInfoUpdate, fetchQuizByAdmin } = props

    const [titleQuiz, setTitleQuiz] = useState('')
    const [description, setDescription] = useState('')
    const [type, setType] = useState('')
    const [image, setImage] = useState('')
    const [reviewImg, setReviewImg] = useState('')

    const defaultValidInput = {
        isValidName: true,
    }
    const [ojbCheckInput, setOjbCheckInput] = useState(defaultValidInput)

    const isValidInputs = () => {
        setOjbCheckInput(defaultValidInput);
        if (!titleQuiz) {
            toast.error('Name quiz is required !')
            setOjbCheckInput({ ...defaultValidInput, isValidName: false })
            return false
        }
        return true
    }

    const handleCancel = () => {
        setShowModalUpdateQuiz(false);
        setImage('')
        setReviewImg('')
    };

    const handleUpload = (event) => {
        //console.log(event.target.files[0])
        if (event.target && event.target.files && event.target.files[0]) {
            const img = URL.createObjectURL(event.target.files[0])
            setReviewImg(img)
            setImage(event.target.files[0])
        }
    }

    useEffect(() => {
        //console.log('quizInfoUpdate', quizInfoUpdate);
        if (!_.isEmpty(quizInfoUpdate)) {
            setTitleQuiz(quizInfoUpdate.name)
            setDescription(quizInfoUpdate.description)
            setType(quizInfoUpdate.difficulty)
            if (quizInfoUpdate.image) {
                // convert your Buffer to base64 string
                let image = quizInfoUpdate.image.data
                let base64String = Buffer.from(image).toString('base64');
                setReviewImg(`data:image/jpeg;base64,${base64String}`)
            } else {
                setReviewImg('')
            }
        }

    }, [quizInfoUpdate])

    const handleUpdate = async () => {
        let check = isValidInputs()
        if (check === true) {
            let id = quizInfoUpdate.id
            let data = await putUpdateQuizByAdmin(id, titleQuiz, description, image, type)
            if (data && data.EC === 0) {
                setShowModalUpdateQuiz(false)
                toast.success(data.EM)
                await fetchQuizByAdmin()
            }
            if (data && data.EC !== 0) {
                toast.error(data.EM)
            }
        }
    }

    return (
        <div>
            <Modal
                title='UPDATE QUIZ'
                open={showModalUpdateQuiz}
                onOk={handleUpdate}
                onCancel={handleCancel}
                width={700}
                okText="Save"
            >
                <form>
                    <div className='modal-update-quiz'>
                        <div className='top-content'>
                            <div className='content-1 col-md-12'>
                                <div className="title-quiz form-group col-md-12">
                                    <label >Name :</label>
                                    <input type="text" className={ojbCheckInput.isValidName
                                        ? 'Input-username form-control'
                                        : 'Input-username form-control is-invalid'}
                                        value={titleQuiz}
                                        onChange={(e) => { setTitleQuiz(e.target.value) }} />
                                </div>
                                <div className="description form-group col-md-12">
                                    <label >Description :</label>
                                    <input type="text" className="form-control"
                                        value={description}
                                        onChange={(e) => { setDescription(e.target.value) }} />
                                </div>
                            </div>

                            <div className='content-2'>
                                <div className="type form-group col-md-9">
                                    <label >Type :</label>
                                    <select className="form-control" value={type}
                                        onChange={(e) => { setType(e.target.value) }}>
                                        <option value={'Easy'}>Easy</option>
                                        <option value={'Medium'}>Medium</option>
                                        <option value={'Hard'}>Hard</option>
                                    </select>
                                </div>
                                <div className="img-input">
                                    <label className='label-upload' htmlFor='input-img' >
                                        <FcPlus style={{ fontSize: '24px' }} />Upload Image</label>
                                    <input id='input-img' type="file" hidden
                                        onChange={(event) => { handleUpload(event) }} />
                                </div>
                            </div>
                        </div>

                        <div className="bottom-content col-md-12">
                            <div className="img-review form-group col-md-12">
                                {reviewImg ?
                                    <img className='image' src={reviewImg} alt='avatar' />
                                    :
                                    <span >Review Image</span>}
                            </div>
                        </div>
                    </div>
                </form>
            </Modal>
        </div>
    )
}
