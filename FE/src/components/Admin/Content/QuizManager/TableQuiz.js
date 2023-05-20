import React, { useState } from 'react'
import { PlusCircleTwoTone, MinusCircleTwoTone, EditTwoTone, DeleteTwoTone, RightCircleTwoTone } from '@ant-design/icons';
import { Pagination } from 'antd';
import { deleteQuizByAdmin } from '../../../../services/quizApiService'
import { toast } from 'react-toastify';

const TableQuiz = (props) => {
    const iconCSS = { fontSize: '24px' }
    const {
        listQuizs, totalPages, currentPage, currentLitmit, setCurrentPage,
        fetchQuizByAdmin, setShowModalUpdateQuiz, setQuizInfoUpdate
    } = props
    const [expandedRows, setExpandedRows] = useState([]);
    const toggleExpandRow = (rowId) => {
        if (expandedRows.includes(rowId)) {
            setExpandedRows(expandedRows.filter((id) => id !== rowId));
        } else {
            setExpandedRows([...expandedRows, rowId]);
        }
    }
    const handlePageClick = (page) => {
        setCurrentPage(page);
    }
    const handleDeleteQuiz = async (quizId) => {
        let res = await deleteQuizByAdmin(quizId)
        if (res && res.EC === 0) {
            toast.success(res.EM)
            fetchQuizByAdmin()
        } else {
            toast.success(res.EM)
        }
    }
    const handleUpdateQuiz = (dataQuiz) => {
        setShowModalUpdateQuiz(true)
        setQuizInfoUpdate(dataQuiz)
    }

    return (
        <>
            <div><b>List quiz :</b></div>
            <table className="table table-bordered table-hover my-2">
                <thead>
                    <tr className='table-primary'>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Type</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {listQuizs && listQuizs.length > 0 && listQuizs.map((item, index) => {
                        return (
                            <React.Fragment key={`table-user-key-${index}`}>
                                <tr>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.difficulty}</td>
                                    <td>
                                        <div className='table-action'>

                                            {expandedRows.includes(item.id) ?
                                                <MinusCircleTwoTone style={iconCSS}
                                                    onClick={() => toggleExpandRow(item.id)} />
                                                :
                                                <PlusCircleTwoTone style={iconCSS}
                                                    onClick={() => toggleExpandRow(item.id)} />
                                            }

                                            <EditTwoTone style={iconCSS}
                                                onClick={() => handleUpdateQuiz(item)} />
                                            <DeleteTwoTone
                                                onClick={() => handleDeleteQuiz(item.id)}
                                                style={iconCSS} />

                                        </div>
                                    </td>
                                </tr>
                                < tr className={`collapse ${expandedRows.includes(item.id) ? 'show' : ''}`}>
                                    <td>
                                    </td>
                                    <td colSpan="3">
                                        <div className='expandContent d-flex'>
                                            <div className='expandContentDetail'>
                                                <div className="tab-content col-12">
                                                    <RightCircleTwoTone style={iconCSS}
                                                        onClick={() => toggleExpandRow(item.id)} />
                                                    <b>Description :</b> {item.description}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </React.Fragment>
                        )
                    })}
                    {listQuizs && listQuizs.length < 0 &&
                        <tr>
                            <td colSpan="4">Quiz empty ....</td>
                        </tr>
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

export default TableQuiz