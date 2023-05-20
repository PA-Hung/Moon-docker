import React, { useState } from 'react'
import { Modal } from 'antd';
import './ModalAddUser.scss'
import { FcPlus } from 'react-icons/fc';
import { postCreateNewUser } from '../../../../../services/adminApiService';
import { toast } from 'react-toastify';

const ModalAddUser = (props) => {
    const { showModalAddUser, setShowModalAddUser, fetchListUser } = props

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
        if (!pass) {
            toast.error('Password is required !')
            setOjbCheckInput({ ...defaultValidInput, isValidPassword: false })
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

    const resetModal = () => {
        setShowModalAddUser(false);
        setEmail('')
        setPass('')
        setUsername('')
        setImage('')
        setReviewImg('')
    }

    const handleUpload = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            const img = URL.createObjectURL(event.target.files[0])
            setReviewImg(img)
            setImage(event.target.files[0])
        }
    }

    const handleSave = async () => {
        // valideate
        let check = isValidInputs()
        if (check === true) {
            let data = await postCreateNewUser(email, pass, username, role, image)
            if (data && data.EC === 0) {
                resetModal()
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
                title='ADD NEW STUDENT'
                open={showModalAddUser}
                onOk={handleSave}
                onCancel={resetModal}
                width={700}
                okText="Save"
            >
                <form>
                    <div className="add-new-form">
                        <div className='left-content'>
                            <div className="username form-group col-md-12">
                                <label >Username</label>
                                <input type="text"
                                    className={ojbCheckInput.isValidUsername
                                        ? 'Input-username form-control'
                                        : 'Input-username form-control is-invalid'}
                                    value={username}
                                    onChange={(e) => { setUsername(e.target.value) }} />
                            </div>
                            <div className="password form-group col-md-12">
                                <label >Password</label>
                                <input type="password"
                                    className={ojbCheckInput.isValidPassword
                                        ? 'Input-pass form-control'
                                        : 'Input-pass form-control is-invalid'}
                                    value={pass}
                                    onChange={(e) => { setPass(e.target.value) }} />
                            </div>
                            <div className="email form-group col-md-12">
                                <label >Email</label>
                                <input type="email"
                                    className={ojbCheckInput.isValidEmail
                                        ? 'Input-email form-control'
                                        : 'Input-email form-control is-invalid'}
                                    value={email}
                                    onChange={(e) => { setEmail(e.target.value) }} />
                            </div>
                            <div className="role form-group col-md-12">
                                <label >Role</label>
                                <select id="inputState" className="form-control"
                                    onChange={(e) => { setRole(e.target.value) }}>
                                    <option value={'User'}>User</option>
                                    <option value={'Admin'}>Admin</option>
                                </select>
                            </div>
                        </div>
                        <div className='right-content'>
                            <div className="img-review form-group col-md-12">
                                {reviewImg ?
                                    <img className='image' src={reviewImg} alt='avatar' />
                                    :
                                    <span >Review Image</span>}
                            </div>
                            <div className="img-input form-group">
                                <label className='label-upload' htmlFor='input-img' >
                                    <FcPlus style={{ fontSize: '24px' }} />Upload Image
                                </label>
                                <input id='input-img' type="file" hidden
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

export default ModalAddUser