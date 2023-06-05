// eslint-disable-next-line
import React from 'react'
import { Sidebar, Menu, MenuItem, useProSidebar } from 'react-pro-sidebar';
import bgImage from '../../assets/bg2.jpg'
import './SideBar.scss'
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom'
import { MdSpaceDashboard, MdQuiz, MdAssignmentInd, MdNightsStay, MdDescription, MdPeopleAlt, MdGrading } from "react-icons/md";
import {
    useDispatch,
    //useSelector
} from 'react-redux';
import { reduxActivePage } from '../../redux/action/activePageAction';

const SideBar = (props) => {
    const iconCSS = { fontSize: '30px' }
    const dispatch = useDispatch()
    //const activePage = useSelector(state => state.activePage.page)
    // eslint-disable-next-line
    const { collapseSidebar, toggleSidebar, collapsed, toggled, broken, rtl } = useProSidebar();
    // useEffect(() => {
    //     console.log('>>>>>>>>> check collapsed ', collapsed)
    // }, [collapsed])


    return (
        <div className='sidebar-container'>
            <Sidebar image={bgImage} >
                <div className='title-sidebar'>
                    <div className='title'>
                        {collapsed ? <MdNightsStay style={{ fontSize: '30px' }} /> : <>
                            <MdNightsStay style={{ fontSize: '30px' }} /><NavLink to="/" className='navbar-brand'><span> MOON ENGLISH</span></NavLink>
                        </>}
                    </div>
                </div>
                <hr />
                <div className='title-menu'>
                    <Menu>
                        <MenuItem
                            active={true}
                            icon={<MdSpaceDashboard style={iconCSS} />}
                            onClick={() => dispatch(reduxActivePage('DashBoard'))}
                            component={<Link to='/admin' />}
                        > DashBoard </MenuItem>
                        <MenuItem icon={<MdPeopleAlt style={iconCSS} />}
                            onClick={() => dispatch(reduxActivePage('Student Manager'))}
                            component={<Link to='user-manager' />}> Student Manager </MenuItem>
                        <MenuItem icon={<MdQuiz style={iconCSS} />}
                            onClick={() => dispatch(reduxActivePage('Quiz Manager'))}
                            component={<Link to='quiz-manager' />}> Quiz Manager </MenuItem>
                        <MenuItem icon={<MdDescription style={iconCSS} />}
                            onClick={() => dispatch(reduxActivePage('Question Manager'))}
                            component={<Link to='question-manager' />}> Question Manager </MenuItem>
                        <MenuItem icon={<MdAssignmentInd style={iconCSS} />}
                            onClick={() => dispatch(reduxActivePage('Assign To Student'))}
                            component={<Link to='assign-to-student' />}> Assign To Student </MenuItem>
                        <MenuItem icon={<MdGrading style={iconCSS} />}
                            onClick={() => dispatch(reduxActivePage('QA Update'))}
                            component={<Link to='qa-update' />}> QA Update </MenuItem>
                    </Menu>
                </div>
            </Sidebar>
        </div>
    )
}

export default SideBar