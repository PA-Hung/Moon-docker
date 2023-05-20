import './ModalUserProfile.scss'
import React, { useEffect, useState } from 'react'
import { Modal } from 'antd';
import { FcPlus } from 'react-icons/fc';
import { toast } from 'react-toastify';
import { Buffer } from 'buffer';
import { getUserProfile, putUserProfile } from '../../services/userApiService';
import { useSelector } from 'react-redux';

const ModalUserProfile = (props) => {
    const { showModalUserProfile, setShowModalUserProfile } = props
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated)

    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmNPassword, setConfirmNPassword] = useState('')
    // eslint-disable-next-line
    const [image, setImage] = useState('')
    const [reviewImg, setReviewImg] = useState('')

    const defaultValidInput = {
        isValidEmail: true,
        isValidUsername: true,
        isValidOldPassword: true,
        isValidNewPassword: true,
        isValidConfirmNPassword: true,
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
        if (!oldPassword) {
            toast.error('Old Password is required !')
            setOjbCheckInput({ ...defaultValidInput, isValidOldPassword: false })
            return false
        }
        if (!newPassword) {
            toast.error('New Password is required !')
            setOjbCheckInput({ ...defaultValidInput, isValidNewPassword: false })
            return false
        }
        if (!confirmNPassword) {
            toast.error('Confirm New Password is required !')
            setOjbCheckInput({ ...defaultValidInput, isValidConfirmNPassword: false })
            return false
        }
        if (newPassword !== confirmNPassword) {
            toast.error('Password is not the same')
            setOjbCheckInput({ ...defaultValidInput, isValidConfirmPassword: false })
            return false
        }
        return true
    }

    const fetchUserProfile = async () => {
        let res = await getUserProfile()
        if (res && res.EC === 0) {
            setEmail(res.DT.email)
            setUsername(res.DT.username)
            if (res.DT.image) {
                // convert your Buffer to base64 string
                let image = res.DT.image.data
                let base64String = Buffer.from(image).toString('base64');
                setImage(res.DT.image)
                setReviewImg(`data:image/jpeg;base64,${base64String}`)
            } else {
                setReviewImg('')
            }
        }
        // else {
        //     toast.error(res.EM)
        // }
    }

    useEffect(() => {
        if (isAuthenticated) {
            fetchUserProfile()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleCancel = () => {
        setShowModalUserProfile(false);
    };

    const handleUpload = (event) => {
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
            let res = await putUserProfile(username, email, oldPassword, newPassword, image)
            if (res && res.EC === 0) {
                toast.success(res.EM)
                setOldPassword('')
                setConfirmNPassword('')
                setNewPassword('')
                setEmail('')
                setUsername('')
                setImage('')
                setReviewImg('')
                setShowModalUserProfile(false)
            } else {
                toast.success(res.EM)
            }
        }
    }


    return (
        <div>
            <Modal
                title='My Profile'
                open={showModalUserProfile}
                onOk={handleUpdate}
                onCancel={handleCancel}
                width={700}
                okText="Update"
            >
                <form>
                    <div className="profile-form">
                        <div className='left-content-profile'>
                            <div className="form-group col-md-12">
                                <label >Username</label>
                                <input type="text" disabled className={ojbCheckInput.isValidUsername
                                    ? 'Input-username form-control'
                                    : 'Input-username form-control is-invalid'}
                                    value={username}
                                    onChange={(e) => { setUsername(e.target.value) }} />
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
                                <label >Old Password</label>
                                <input type="password" className="form-control"
                                    value={oldPassword}
                                    onChange={(e) => { setOldPassword(e.target.value) }} />
                            </div>
                            <div className="form-group col-md-12">
                                <label >New Password</label>
                                <input type="password" className="form-control"
                                    value={newPassword}
                                    onChange={(e) => { setNewPassword(e.target.value) }} />
                            </div>
                            <div className="form-group col-md-12">
                                <label >Confirm New Password</label>
                                <input type="password" className="form-control"
                                    value={confirmNPassword}
                                    onChange={(e) => { setConfirmNPassword(e.target.value) }} />
                            </div>

                        </div>
                        <div className='right-content-profile'>
                            <div className="img-review-profile form-group col-md-12">
                                {reviewImg ?
                                    <img className='image-profile' src={reviewImg} alt='avatar-profile' />
                                    :
                                    <span >Review Image</span>}
                            </div>
                            <div className="img-input-profile form-group">
                                <label className='label-upload-profile' htmlFor='input-img-profile' >
                                    <FcPlus style={{ fontSize: '24px' }} />Upload Image
                                </label>
                                <input id='input-img-profile' type="file" hidden
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

export default ModalUserProfile