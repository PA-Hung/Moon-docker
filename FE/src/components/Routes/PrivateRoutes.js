import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PrivateRoutes = (props) => {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
    const account = useSelector(state => state.auth.account)
    const currentPath = window.location.pathname;

    if (!isAuthenticated) {
        return <Navigate to='/login' />
    }
    if (account.role === 'User' && currentPath === '/admin') {
        return <Navigate to='/' />
    }

    return (
        <>
            {props.children}
        </>
    )
}

export default PrivateRoutes