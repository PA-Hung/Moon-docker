import React from 'react'
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { postLogout } from '../../../services/authApiService';
import { toast } from 'react-toastify';
import { reduxLogout } from '../../../redux/action/authAction';
import { Buffer } from 'buffer';
import { useState } from 'react';
import ModalUserProfile from '../../User/ModalUserProfile';
import ModalHistory from '../../User/ModalHistory';
import { getUserHistory } from '../../../services/userApiService';
import { getUserProfile } from '../../../services/userApiService';
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
import { FaEdit } from 'react-icons/fa';
import noAvatar from '../../../assets/no avatar.jpg'

const HomeNavbar = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
    const account = useSelector(state => state.auth.account)

    const convertImage = (image) => {
        let base64String = Buffer.from(image).toString('base64');
        let avatarImg = `data:image/jpeg;base64,${base64String}`
        return avatarImg
    }

    // User History
    const [showModalHistory, setShowModalHistory] = useState(false);
    const [userHistory, setUserHistory] = useState([])
    // User History

    // User Profile
    const [showModalUserProfile, setShowModalUserProfile] = useState(false);
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [image, setImage] = useState('')
    const [reviewImg, setReviewImg] = useState('')
    // User Profile

    const handleLogin = () => {
        navigate('/login')
    }

    const handleLogout = async () => {
        let res = await postLogout(account.username, account.refresh_token)
        if (res && res.EC === 0) {
            dispatch(reduxLogout())
            navigate('/')
            toast.success(res.EM)
        }
        else {
            toast.error(res.EM)
        }
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
    }

    const handleUserProfile = () => {
        setShowModalUserProfile(true)
        fetchUserProfile()
    }

    const fetchUserHistory = async () => {
        let res = await getUserHistory()
        if (res && res.EC === 0) {
            setUserHistory(res.DT)
        }
    }

    const handleShowHistory = () => {
        setShowModalHistory(true)
        fetchUserHistory()
    }

    const items = [
        {
            label: (<label style={{ cursor: "pointer" }} onClick={() => handleUserProfile()}>My Profile</label>),
            key: '0',
        },
        {
            label: (<NavLink to="/user" className='nav-link'>My Quizs</NavLink>),
            key: '1',
        },
        {
            label: (<label style={{ cursor: "pointer" }} onClick={() => handleShowHistory()}>My History</label>),
            key: '2',
        },
        {
            type: 'divider',
        },
        {
            label: (<label style={{ cursor: "pointer" }} onClick={() => handleLogout()}>Log Out</label>),
            key: '3',
        },
    ];

    const handleRegister = () => {
        navigate('/register')
    }

    return (
        < >
            <nav className="navbar navbar-expand-lg bg-white navbar-light sticky-top px-4 px-lg-5 py-lg-0">
                <NavLink to="/" className="navbar-brand">
                    <h1 className="m-0 text-primary"><i className="fa fa-book-reader me-3"></i>Moon English</h1>
                </NavLink>
                <button type="button" className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarCollapse">
                    <div className="navbar-nav mx-auto">
                        <NavLink to="/" className="nav-item nav-link active">Home</NavLink>
                        <NavLink to="/AboutUs" className="nav-item nav-link">About Us</NavLink>
                        <NavLink to="/Classes" className="nav-item nav-link">Classes</NavLink>
                        <div className="nav-item dropdown">
                            <NavLink to="/Pages" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">Pages</NavLink>
                            <div className="dropdown-menu rounded-0 rounded-bottom border-0 shadow-sm m-0">
                                <NavLink to="/Facilities" className="dropdown-item">School Facilities</NavLink>
                                <NavLink to="/Popular" className="dropdown-item">Popular Teachers</NavLink>
                                <NavLink to="/Teachers" className="dropdown-item">Become A Teachers</NavLink>
                                <NavLink to="/Appointment" className="dropdown-item">Make Appointment</NavLink>
                                <NavLink to="/Testimonial" className="dropdown-item">Testimonial</NavLink>
                                <NavLink to="/Error" className="dropdown-item">404 Error</NavLink>
                            </div>
                        </div>
                        <NavLink to="/Contact" className="nav-item nav-link">Contact Us</NavLink>
                        {isAuthenticated === true &&
                            <NavLink to="/user" className='nav-item nav-link'>My quizs</NavLink>
                        }
                        {account && account.role === 'Admin' &&
                            <NavLink to="/admin" className='nav-item nav-link'>Administrator</NavLink>
                        }

                    </div>
                    {isAuthenticated === false ?
                        <>
                            <button
                                className="btn btn-primary rounded-pill px-3 d-none d-lg-block"
                                onClick={() => handleLogin()}>Login<i className="fa fa-arrow-right ms-3" /></button>
                            <button style={{ marginLeft: "10px" }}
                                className="btn btn-primary rounded-pill px-3 d-none d-lg-block"
                                onClick={() => handleRegister()}
                            >Register<FaEdit style={{ marginLeft: "15px", marginBottom: "4px", fontSize: "19px" }} /></button>
                        </> :
                        <div className='setting'>
                            <Dropdown
                                menu={{
                                    items,
                                }}
                            >
                                <a href='/' onClick={(e) => e.preventDefault()}>
                                    <Space>
                                        <img className='avatar-header'
                                            src={account.image ? convertImage(account.image) : noAvatar}
                                            alt='avatar' style={{ height: "35px", width: "35px" }} />
                                        <label style={{ fontSize: "20px", fontWeight: "bold" }}>{account.username}</label>
                                        <DownOutlined />
                                    </Space>
                                </a>
                            </Dropdown>
                        </div>
                    }
                </div>
            </nav>
            <ModalUserProfile
                showModalUserProfile={showModalUserProfile}
                setShowModalUserProfile={setShowModalUserProfile}
                email={email}
                setEmail={setEmail}
                username={username}
                setUsername={setUsername}
                image={image}
                setImage={setImage}
                reviewImg={reviewImg}
                setReviewImg={setReviewImg}
            />
            <ModalHistory
                showModalHistory={showModalHistory}
                setShowModalHistory={setShowModalHistory}
                userHistory={userHistory}
            />
        </>
    )
}

export default HomeNavbar