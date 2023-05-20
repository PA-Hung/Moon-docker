// eslint-disable-next-line
import React, { useState, useEffect } from 'react'
import SideBar from './SideBar'
import { useProSidebar } from 'react-pro-sidebar';
import './Admin.scss'
import { FaBars } from 'react-icons/fa'
import { Outlet } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar'
import { Buffer } from 'buffer';
import { Popover } from 'antd';
import Languages from '../Header/Languages';
import { useSelector, useDispatch } from 'react-redux';
import { postLogout } from '../../services/authApiService';
import { toast } from 'react-toastify';
import { reduxLogout } from '../../redux/action/authAction';
import { NavLink, useNavigate } from "react-router-dom";
import ModalUserProfile from '../User/ModalUserProfile';
import ModalHistory from '../User/ModalHistory';


const Admin = () => {
    const [showModalUserProfile, setShowModalUserProfile] = useState(false);
    const [showModalHistory, setShowModalHistory] = useState(false);
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

    const contentSetting = (
        <div className='contentSetting'>
            <label className='profile' onClick={() => setShowModalUserProfile(true)}>My Profile</label>
            <NavLink to="/user" className='nav-link'>My Quizs</NavLink>
            <label className='profile' onClick={() => setShowModalHistory(true)}>My History</label>
            <label className='logout' onClick={() => handleLogout()}>Logout</label>
        </div>
    );

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
                        <Languages />
                        <Popover
                            content={contentSetting}
                            overlayStyle={{ width: "5vw" }}>
                            <img className='avatar-header' src={avatarImg} alt='avatar' />
                        </Popover>
                        <label>{account.username}</label>

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
            />
            <ModalHistory
                showModalHistory={showModalHistory}
                setShowModalHistory={setShowModalHistory}
            />
        </div>
    )
}

export default Admin