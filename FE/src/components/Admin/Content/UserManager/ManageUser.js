import React from 'react'
import { Button } from 'antd';
import { useState, useEffect } from 'react';
import ModalAddUser from './Modal/ModalAddUser';
import { TableUser } from './TableUser';
import './ManageUser.scss'
import { getAllUserWithPagin } from '../../../../services/adminApiService'
import { ModalUpdateUser } from './Modal/ModalUpdateUser';
import ModalDeleteUser from './Modal/ModalDeleteUser';
import { UserAddOutlined } from '@ant-design/icons';

const ManageUser = (props) => {
    const [showModalAddUser, setShowModalAddUser] = useState(false);
    const [showModalUpdateUser, setShowModalUpdateUser] = useState(false);
    const [showModalDeleteUser, setShowModalDeleteUser] = useState(false);
    const [listUser, setListUser] = useState([])
    const [userInfoUpdate, setUserInfoUpdate] = useState([])
    const [UserDelete, setUserDelete] = useState({})

    // Pagination User ------------------------------
    // eslint-disable-next-line
    const [currentLitmit, setCurrentLimit] = useState(10)
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0)
    // Pagination User ------------------------------

    useEffect(() => {
        fetchListUser()
        // eslint-disable-next-line
    }, [currentPage])

    const fetchListUser = async () => {
        let res = await getAllUserWithPagin(currentPage, currentLitmit)
        if (res && res.EC === 0) {
            setTotalPages(res.DT.totalPages)
            if (res.DT.totalPages > 0 && res.DT.users.length === 0) {
                setCurrentPage(res.DT.totalPages)
            }
            if (res.DT.totalPages > 0 && res.DT.users.length > 0) {
                setListUser(res.DT.users)
            }
        }
    }

    const handleUpdateUser = (infoUpdate) => {
        setShowModalUpdateUser(true)
        setUserInfoUpdate(infoUpdate)
    }

    const handleDeleteUser = (data) => {
        setShowModalDeleteUser(true)
        setUserDelete(data)
        //console.log('>>>', data)
    }

    return (
        <div>
            <div>
                <Button
                    shape="circle"
                    className='mx-3'
                    type="primary"
                    onClick={() => { setShowModalAddUser(true) }} size={'large'}>
                    <UserAddOutlined style={{ fontSize: '24px' }} />
                </Button>
            </div>
            <div className='table-user'>
                <TableUser
                    listUser={listUser}
                    showModalUpdateUser={showModalUpdateUser}
                    handleUpdateUser={handleUpdateUser}
                    handleDeleteUser={handleDeleteUser}
                    setCurrentPage={setCurrentPage}
                    totalPages={totalPages}
                    currentPage={currentPage}
                    currentLitmit={currentLitmit}
                />
            </div>
            <ModalAddUser
                showModalAddUser={showModalAddUser}
                setShowModalAddUser={setShowModalAddUser}
                fetchListUser={fetchListUser}
            />
            <ModalUpdateUser
                showModalUpdateUser={showModalUpdateUser}
                setShowModalUpdateUser={setShowModalUpdateUser}
                userInfoUpdate={userInfoUpdate}
                fetchListUser={fetchListUser}
            />
            <ModalDeleteUser
                showModalDeleteUser={showModalDeleteUser}
                setShowModalDeleteUser={setShowModalDeleteUser}
                UserDelete={UserDelete}
                fetchListUser={fetchListUser}
            />
        </div>
    )
}

export default ManageUser