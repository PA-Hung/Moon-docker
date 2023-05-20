import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink, useNavigate } from "react-router-dom";
import './Header.scss'
import { useDispatch, useSelector } from 'react-redux';
import { postLogout } from '../../services/authApiService';
import { toast } from 'react-toastify';
import { reduxLogout } from '../../redux/action/authAction';
import Languages from './Languages';
import { Buffer } from 'buffer';
import { Popover } from 'antd';
import { useState } from 'react';
import ModalUserProfile from '../User/ModalUserProfile';
import ModalHistory from '../User/ModalHistory';

const Header = () => {
    const navigate = useNavigate()
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
    const account = useSelector(state => state.auth.account)
    const dispatch = useDispatch()
    let base64String = Buffer.from(account.image).toString('base64');
    let avatarImg = `data:image/jpeg;base64,${base64String}`
    const [showModalUserProfile, setShowModalUserProfile] = useState(false);
    const [showModalHistory, setShowModalHistory] = useState(false);

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

    const contentSetting = (
        <div className='contentSetting'>
            {account && account.role === 'Admin' &&
                <NavLink to="/admin" className='nav-link'>Admin</NavLink>
            }
            <label className='profile' onClick={() => setShowModalUserProfile(true)}>My Profile</label>
            <NavLink to="/user" className='nav-link'>My Quizs</NavLink>
            <label className='profile' onClick={() => setShowModalHistory(true)}>My History</label>
            <label className='logout' onClick={() => handleLogout()}>LogOut</label>
        </div>
    );

    return (
        <>
            <Navbar bg="light" expand="lg">
                <Container>
                    <NavLink to="/" className='navbar-brand'>Moon-ENGLISH</NavLink>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <NavLink to="/" className='nav-link'>Home</NavLink>
                            {account && account.role === 'Admin' &&
                                <NavLink to="/admin" className='nav-link'>Admin</NavLink>
                            }
                            <NavLink to="/user" className='nav-link'>My quizs</NavLink>
                        </Nav>
                        <Nav>
                            <Languages />
                            {isAuthenticated === false ?
                                <>
                                    <button className='btn-login' onClick={() => handleLogin()}>Login</button>
                                    <button className='btn-signup'>Signup</button>
                                </> :
                                <div className='setting'>
                                    <Popover
                                        content={contentSetting}
                                        overlayStyle={{ width: "5vw" }}>
                                        <img className='avatar-header' src={avatarImg} alt='avatar' />
                                    </Popover>
                                    <label>{account.username}</label>
                                </div>
                            }

                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <ModalUserProfile
                showModalUserProfile={showModalUserProfile}
                setShowModalUserProfile={setShowModalUserProfile}
            />
            <ModalHistory
                showModalHistory={showModalHistory}
                setShowModalHistory={setShowModalHistory}
            />
        </>
    );
}

export default Header;