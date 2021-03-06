import { useState } from 'react';
import { NotificationManager } from 'react-notifications';
import { useSelector } from 'react-redux';
import { isRegisterData } from '../../store/user';

import LoginForm from '../LoginForm';
import Menu from '../Menu';
import Modal from '../Modal';
import Navbar from '../Navbar';

const MenuHeader = ({ bgActive }) => {
    const [isOpen, setOpen] = useState(null);
    const [isOpenModal, setOpenModal] = useState(true);
    const isRegister = useSelector(isRegisterData);
    const handleClickHamburg = () => {
        setOpen(prevState => !prevState);
    }
    const handleClickLogin = () => {
        setOpenModal(prevState => !prevState);
    }

    const handleSubmitLoginForm = async ({ email, password }) => {
        const requestOptions = {
            method: 'POST',
            body: JSON.stringify({
                email,
                password,
                returnSecureToken: true
            })
        };
        const response = isRegister ?
            await fetch(' https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAYC1tuB8cKJ-yTF_4cw8hSZcU7LFBin5w',
                requestOptions).then(res => res.json()) :
            await fetch(' https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAYC1tuB8cKJ-yTF_4cw8hSZcU7LFBin5w',
                requestOptions).then(res => res.json());
        console.log(response);
        if (response.hasOwnProperty('error')) {
            NotificationManager.error(response.error.message, 'Title');
        } else {
            NotificationManager.success('Success message');
        }
    }
    return (
        <>
            <Menu isOpen={isOpen} onClickHamburg={handleClickHamburg} />
            <Navbar
                isOpen={isOpen}
                bgActive={bgActive}
                onClickHamburg={handleClickHamburg}
                onClickLogin={handleClickLogin} />
            <Modal
                isOpen={isOpenModal}
                title="Log in..."
                onCloseModal={handleClickLogin}
            >
                <LoginForm onSubmit={handleSubmitLoginForm} />
            </Modal>
        </>
    );
}

export default MenuHeader;