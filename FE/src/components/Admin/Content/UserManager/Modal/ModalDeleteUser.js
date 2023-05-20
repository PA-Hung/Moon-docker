import React from 'react'
import { Modal } from 'antd';
import { deleteUser } from '../../../../../services/adminApiService';
import { toast } from 'react-toastify';


const ModalDeleteUser = (props) => {

    const { showModalDeleteUser, setShowModalDeleteUser, UserDelete, fetchListUser } = props
    const handleCancel = () => {
        setShowModalDeleteUser(false);
    };

    const handleDelete = async () => {
        let res = await deleteUser(UserDelete.id)
        if (res && res.EC === 0) {
            setShowModalDeleteUser(false)
            toast.success(res.EM)
            await fetchListUser()
        }
        if (res && res.EC !== 0) {
            toast.error(res.EM)
        }
    }

    return (
        <div>
            <Modal
                title='Do you want to delete this user ?'
                open={showModalDeleteUser}
                onOk={handleDelete}
                onCancel={handleCancel}
                width={350}
                okText="Delete"
            >
                <div><b>Username : {UserDelete.username}</b></div>
            </Modal>
        </div>
    )
}

export default ModalDeleteUser