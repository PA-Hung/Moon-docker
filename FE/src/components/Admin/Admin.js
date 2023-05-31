// eslint-disable-next-line
import React, { useState, useEffect } from 'react'
import SideBar from './SideBar'
import { useProSidebar } from 'react-pro-sidebar';
import './Admin.scss'
import { FaBars } from 'react-icons/fa'
import { Outlet } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar'
import { Buffer } from 'buffer';
import { useSelector, useDispatch } from 'react-redux';
import { postLogout } from '../../services/authApiService';
import { toast } from 'react-toastify';
import { reduxLogout } from '../../redux/action/authAction';
import { NavLink, useNavigate } from "react-router-dom";
import ModalUserProfile from '../User/ModalUserProfile';
import ModalHistory from '../User/ModalHistory';
import { getUserHistory } from '../../services/userApiService';
import { getUserProfile } from '../../services/userApiService';
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';

const Admin = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    // eslint-disable-next-line
    const { collapseSidebar, toggleSidebar, collapsed, toggled, broken, rtl } = useProSidebar();
    const handleCollapse = () => {
        // console.log('collapsed', collapsed)
        // console.log('toggled', toggled)
        // console.log('broken', broken)
        // console.log('rtl', rtl)
        collapseSidebar()
    }
    const account = useSelector(state => state.auth.account)
    const activePage = useSelector(state => state.activePage.page)
    let base64String = Buffer.from(account.image).toString('base64');
    let avatarImg = `data:image/jpeg;base64,${base64String}`

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

    const handleLogout = async () => {
        let res = await postLogout(account.username, account.refresh_token)
        if (res && res.EC === 0) {
            dispatch(reduxLogout())
            navigate('/')
            toast.success(res.EM)
        } else {
            toast.error(res.EM)
        }
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

    return (
        <div className='admin-container'>
            <div className='admin-sidebar'><SideBar /></div>
            <div className='admin-main'>

                <div className='top-bar'>
                    <div className='showhide-icon'>
                        <FaBars onClick={() => { handleCollapse() }} />
                    </div>
                    <div className='top-bar-content'>
                        {activePage.name}
                    </div>
                    <div className='setting'>
                        <Dropdown
                            menu={{
                                items,
                            }}
                        >
                            <a href='/' onClick={(e) => e.preventDefault()}>
                                <Space>
                                    <img className='avatar-header' src={avatarImg} alt='avatar' style={{ height: "35px", width: "35px" }} />
                                    <label style={{ fontSize: "20px", fontWeight: "bold" }}>{account.username}</label>
                                    <DownOutlined />
                                </Space>
                            </a>
                        </Dropdown>
                    </div>
                </div>

                <hr />

                <div className='admin-main-content'>
                    <PerfectScrollbar>
                        <Outlet />
                    </PerfectScrollbar>
                </div>

            </div>
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
        </div>
    )
}

export default Admin