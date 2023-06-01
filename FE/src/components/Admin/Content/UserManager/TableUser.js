import React from 'react'
import { FormOutlined, DeleteOutlined, FileDoneOutlined } from '@ant-design/icons';
import { Pagination } from 'antd';

export const TableUser = (props) => {
    const { listUser, handleUpdateUser, handleDeleteUser, handleUserHistoryByID,
        setCurrentPage, totalPages, currentPage, currentLitmit } = props

    const handlePageClick = (page) => {
        setCurrentPage(page);
    }

    return (
        <>
            <table className="table table-bordered table-hover">
                <thead>
                    <tr className='table-primary'>
                        <th scope="col">#</th>
                        <th scope="col">Username</th>
                        <th scope="col">Email</th>
                        <th scope="col">Role</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {listUser && listUser.length > 0 && listUser.map((item, index) => {
                        return (
                            <tr key={`table-user-key-${index}`}>
                                <th scope="row">{(currentPage - 1) * currentLitmit + index + 1}</th>
                                <td>{item.username}</td>
                                <td>{item.email}</td>
                                <td>{item.role}</td>
                                <td>
                                    <div className='d-flex'>
                                        <div >
                                            <FormOutlined
                                                style={{ fontSize: '24px', color: 'black' }}
                                                onClick={() => handleUpdateUser(item)} />
                                        </div>
                                        <div>
                                            <DeleteOutlined
                                                style={{ fontSize: '26px', marginLeft: '15px', color: 'red' }}
                                                onClick={() => handleDeleteUser({
                                                    id: item.id,
                                                    username: item.username
                                                })} />
                                        </div>
                                        <div>
                                            <FileDoneOutlined
                                                onClick={() => handleUserHistoryByID(item.id)}
                                                style={{ fontSize: '24px', marginLeft: '15px', color: 'blue' }} />
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        )
                    })}
                    {listUser && listUser.length === 0 &&
                        <>
                            <tr>
                                <td colSpan="5">User not found</td>
                            </tr>
                        </>
                    }

                </tbody>
            </table>
            <div className='d-flex justify-content-center'>
                <div>
                    <Pagination
                        current={currentPage}
                        total={totalPages * 10}
                        onChange={handlePageClick}
                        pageSize={currentLitmit}
                    />
                </div>
            </div>
        </>
    )
}
