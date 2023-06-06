import React from 'react'
import './Register.scss'
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { ImSpinner9 } from 'react-icons/im'
import { postRegister } from '../../services/authApiService';

const Register = () => {
    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [createPassword, setCreatePassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const defaultObjValidInput = {
        isValidUser: true,
        isValidEmail: true,
        isValidCreatePass: true,
        isValidConfirmPass: true,
    }
    const [objValidInput, SetObjValidInput] = useState(defaultObjValidInput)

    const handleRegister = async () => {
        SetObjValidInput(defaultObjValidInput)
        if (!username) {
            toast.error('Please enter username !')
            SetObjValidInput({ ...defaultObjValidInput, isValidUser: false })
            return false
        }
        if (!email) {
            toast.error('Please enter email !')
            SetObjValidInput({ ...defaultObjValidInput, isValidEmail: false })
            return false
        }
        if (!createPassword) {
            toast.error('Please enter create your password !')
            SetObjValidInput({ ...defaultObjValidInput, isValidCreatePass: false })
            return false
        }
        if (!confirmPassword) {
            toast.error('Please enter confirm your password !')
            SetObjValidInput({ ...defaultObjValidInput, isValidConfirmPass: false })
            return false
        }
        if (createPassword !== confirmPassword) {
            toast.error('Password must be the same !')
            SetObjValidInput({ ...defaultObjValidInput, isValidCreatePass: false, isValidConfirmPass: false })
            return false
        }
        setIsLoading(true)
        let res = await postRegister(username, email, confirmPassword)
        if (res && res.EC === 0) {
            toast.success(res.EM)
            setIsLoading(false)
            navigate('/login')
        }
        if (res && res.EC !== 0) {
            toast.error(res.EM)
            setIsLoading(false)
        }
    }

    const handleEnter = (event) => {
        if (event.key === 'Enter') {
            handleRegister()
        }
    }


    return (
        <div className="login-container">
            <ul className="background">
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <div className="container">
                    <div className="row px-3 px-sm-0 justify-content-center">

                        <div className="content-right d-flex flex-column gap-3 py-3 col-12 col-md-8 col-xl-4">
                            {/* Mặc định col 12, khi size md ≥768px và hiện 5 col, 
                        khi size ≥1200px hiện 4 col, khi size ≥1400px hiện 3 col */}

                            <div className='facebook-right'>
                                {/* <img className='logo-mobi' src={logo} alt="logo-mobi" /> */}
                                <label style={{ fontSize: "30px", fontWeight: "bolder" }}>Register Form</label>
                            </div>
                            <input
                                className={
                                    objValidInput.isValidUser ?
                                        'Input-pass form-control' :
                                        'Input-pass form-control is-invalid'
                                }
                                type='text'
                                placeholder='Username'
                                value={username}
                                onChange={(event) => setUsername(event.target.value)}
                            />
                            <input
                                className={
                                    objValidInput.isValidEmail ?
                                        'Input-pass form-control' :
                                        'Input-pass form-control is-invalid'
                                }
                                type='text'
                                placeholder='Email'
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                            />
                            <input
                                className={
                                    objValidInput.isValidCreatePass ?
                                        'Input-pass form-control' :
                                        'Input-pass form-control is-invalid'
                                }
                                type='password'
                                placeholder='Create Password'
                                value={createPassword}
                                onChange={(event) => setCreatePassword(event.target.value)}
                            />
                            <input
                                className={
                                    objValidInput.isValidConfirmPass ?
                                        'Input-pass form-control' :
                                        'Input-pass form-control is-invalid'
                                }
                                type='password'
                                placeholder='Confirm Password'
                                value={confirmPassword}
                                onChange={(event) => setConfirmPassword(event.target.value)}
                                onKeyDown={(event) => handleEnter(event)}
                            />
                            <button
                                disabled={isLoading}
                                className='btLogin btn btn-primary'
                                onClick={() => handleRegister()}
                            >

                                {isLoading === true && <ImSpinner9 className='ImSpinner9' />}
                                <span>Register now</span></button>
                            <span className='text-center'>Already have an account ?<> </>
                                <button className='login-now' onClick={() => navigate('/login')}>Login now</button>
                            </span>
                            <hr />
                            <div className='text-center'>
                                <button className='btCNAcc btn btn-success'
                                    onClick={() => navigate('/')}
                                >Back to Home</button>
                            </div>
                        </div>
                    </div>
                </div>
            </ul>
        </div>
    )
}

export default Register