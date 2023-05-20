import React, { useEffect, useState } from 'react'
import { Modal } from 'antd';
import './ModalUpdateUser.scss'
import { FcPlus } from 'react-icons/fc';
import { putUpdateUser } from '../../../../../services/adminApiService';
import { toast } from 'react-toastify';
import _ from 'lodash'
import { Buffer } from 'buffer';

export const ModalUpdateUser = (props) => {
    const { showModalUpdateUser, setShowModalUpdateUser, userInfoUpdate, fetchListUser } = props

    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const [username, setUsername] = useState('')
    const [role, setRole] = useState('User')
    const [image, setImage] = useState('')
    const [reviewImg, setReviewImg] = useState('')

    const defaultValidInput = {
        isValidEmail: true,
        isValidUsername: true,
        isValidPassword: true,
    }
    const [ojbCheckInput, setOjbCheckInput] = useState(defaultValidInput)

    const isValidInputs = () => {
        setOjbCheckInput(defaultValidInput);
        if (!username || username.trim().length < 4 || /\s/.test(username)) {
            if (!username) {
                toast.error('Username is required!')
            } else if (username.trim().length < 4) {
                toast.error('Username must be at least 4 characters long!')
            } else {
                toast.error('Username must not contain any spaces!')
            }
            setOjbCheckInput({ ...defaultValidInput, isValidUsername: false })
            return false
        }

        if (!email) {
            toast.error('Email is required !')
            setOjbCheckInput({ ...defaultValidInput, isValidEmail: false })
            return false
        }
        let regx = /\S+@\S+\.\S+/;
        if (!regx.test(email)) {
            toast.error('Invalid email !')
            setOjbCheckInput({ ...defaultValidInput, isValidEmail: false })
            return false
        }
        return true
    }

    useEffect(() => {
        if (!_.isEmpty(userInfoUpdate)) {
            setEmail(userInfoUpdate.email)
            setUsername(userInfoUpdate.username)
            setRole(userInfoUpdate.role)
            if (userInfoUpdate.image) {
                // convert your Buffer to base64 string
                let image = userInfoUpdate.image.data
                let base64String = Buffer.from(image).toString('base64');
                setReviewImg(`data:image/jpeg;base64,${base64String}`)
            } else {
                setReviewImg('')
            }
        }

    }, [userInfoUpdate])

    const handleCancel = () => {
        setShowModalUpdateUser(false);
    };

    const handleUpload = (event) => {
        console.log(event.target.files[0])
        if (event.target && event.target.files && event.target.files[0]) {
            const img = URL.createObjectURL(event.target.files[0])
            setReviewImg(img)
            setImage(event.target.files[0])
        }
    }

    const handleUpdate = async () => {
        // validate
        let check = isValidInputs()
        if (check === true) {
            let id = userInfoUpdate.id
            let data = await putUpdateUser(id, email, pass, username, role, image)
            if (data && data.EC === 0) {
                setShowModalUpdateUser(false)
                toast.success(data.EM)
                await fetchListUser()
            }
            if (data && data.EC !== 0) {
                toast.error(data.EM)
            }
        }
    }


    return (
        <div>
            <Modal
                title='UPDATE STUDENT'
                open={showModalUpdateUser}
                onOk={handleUpdate}
                onCancel={handleCancel}
                width={700}
                okText="Save"
            >
                <form>
                    <div className="update-form">
                        <div className='left-content-update'>
                            <div className="form-group col-md-12">
                                <label >Username</label>
                                <input type="text" className={ojbCheckInput.isValidUsername
                                    ? 'Input-username form-control'
                                    : 'Input-username form-control is-invalid'}
                                    value={username}
                                    onChange={(e) => { setUsername(e.target.value) }} />
                            </div>
                            <div className="form-group col-md-12">
                                <label >Password</label>
                                <input type="password" className="form-control"
                                    value={pass}
                                    onChange={(e) => { setPass(e.target.value) }} />
                            </div>
                            <div className="form-group col-md-12">
                                <label >Email</label>
                                <input type="email" className={ojbCheckInput.isValidEmail
                                    ? 'Input-email form-control'
                                    : 'Input-email form-control is-invalid'}
                                    value={email}
                                    onChange={(e) => { setEmail(e.target.value) }} />
                            </div>
                            <div className="form-group col-md-12">
                                <label >Role</label>
                                <select className="form-control" value={role}
                                    onChange={(e) => { setRole(e.target.value) }}>
                                    <option value={'User'}>User</option>
                                    <option value={'Admin'}>Admin</option>
                                </select>
                            </div>
                        </div>
                        <div className='right-content-update'>
                            <div className="img-review-update form-group col-md-12">
                                {reviewImg ?
                                    <img className='image-update' src={reviewImg} alt='avatar-update' />
                                    :
                                    <span >Review Image</span>}
                            </div>
                            <div className="img-input-update form-group">
                                <label className='label-upload-update' htmlFor='input-img-update' >
                                    <FcPlus style={{ fontSize: '24px' }} />Upload Image
                                </label>
                                <input id='input-img-update' type="file" hidden
                                    onChange={(event) => { handleUpload(event) }}
                                />
                            </div>
                        </div>
                    </div>

                </form>
            </Modal>
        </div>
    )
}
