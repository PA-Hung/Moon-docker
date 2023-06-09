import './Login.scss'
import { useState } from 'react';
import { toast } from 'react-toastify';
import { postLogin } from '../../services/authApiService';
import { useDispatch } from 'react-redux';
import { reduxLogin } from '../../redux/action/authAction';
import { useNavigate } from 'react-router-dom';
import { ImSpinner9 } from 'react-icons/im'

const Login = () => {
    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const dispatch = useDispatch()

    const defaultObjValidInput = {
        isValidUser: true,
        isValidPass: true
    }
    const [objValidInput, SetObjValidInput] = useState(defaultObjValidInput)

    const handleLogin = async () => {
        SetObjValidInput(defaultObjValidInput)
        if (!username) {
            toast.error('Please enter username !')
            SetObjValidInput({ ...defaultObjValidInput, isValidUser: false })
            return false
        }
        if (!password) {
            toast.error('Please enter your password !')
            SetObjValidInput({ ...defaultObjValidInput, isValidPass: false })
            return false
        }
        setIsLoading(true)
        let res = await postLogin(username, password)
        if (res && res.EC === 0) {
            toast.success(res.EM)
            dispatch(reduxLogin(res))
            setIsLoading(false)
            navigate('/')
        }
        if (res && res.EC !== 0) {
            toast.error(res.EM)
            setIsLoading(false)
        }

    }

    const handleEnter = (event) => {
        if (event.key === 'Enter') {
            handleLogin()
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
                                <label style={{ fontSize: "30px", fontWeight: "bolder" }}>Login Form</label>
                            </div>
                            <input
                                className={
                                    objValidInput.isValidUser ?
                                        'Input-email form-control' :
                                        'Input-email form-control is-invalid'
                                } type='text'
                                placeholder='Username'
                                value={username}
                                onChange={(event) => setUsername(event.target.value)}
                            />
                            <input
                                className={
                                    objValidInput.isValidPass ?
                                        'Input-pass form-control' :
                                        'Input-pass form-control is-invalid'
                                } type='password'
                                placeholder='Password'
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                                onKeyDown={(event) => handleEnter(event)}
                            />
                            <button
                                disabled={isLoading}
                                className='btLogin btn btn-primary'
                                onClick={() => handleLogin()}
                            >

                                {isLoading === true && <ImSpinner9 className='ImSpinner9' />}
                                <span>Login</span></button>
                            <span className='text-center'>Don't have an account ?<> </>
                                <button className='register-now' onClick={() => navigate('/register')}>Register now</button>
                            </span>
                            <hr />
                            <div className='text-center'>
                                <button className='btCNAcc btn btn-success'
                                    onClick={() => navigate('/')}>Back to Home</button>
                            </div>
                        </div>
                    </div>
                </div>
            </ul >
        </div>

    )
}

export default Login