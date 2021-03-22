import { useState } from 'react';
import { NotificationManager } from 'react-notifications';
import { useDispatch, useSelector } from 'react-redux';
import { getUserUpdateAsync, isRegisterData } from '../../store/user';

import LoginForm from '../LoginForm';
import Menu from '../Menu';
import Modal from '../Modal';
import Navbar from '../Navbar';

const MenuHeader = ({ bgActive }) => {
    const [isOpen, setOpen] = useState(null);
    const [isOpenModal, setOpenModal] = useState(false);
    const isRegister = useSelector(isRegisterData);
    const dispatch = useDispatch();
    const handleClickHamburg = () => {
        setOpen(prevState => !prevState);
    }
    const handleClickLogin = () => {
        setOpenModal(prevState => !prevState);
    }

    const signSignupUser = async ({ email, password }) => {
        const requestOptions = {
            method: 'POST',
            body: JSON.stringify({
                email,
                password,
                returnSecureToken: true
            })
        };
        switch (isRegister) {
            case true:
                return await fetch(' https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAYC1tuB8cKJ-yTF_4cw8hSZcU7LFBin5w',
                    requestOptions).then(res => res.json());
            case false:
                return await fetch(' https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAYC1tuB8cKJ-yTF_4cw8hSZcU7LFBin5w',
                    requestOptions).then(res => res.json());
        }
    }

    const handleSubmitLoginForm = async (props) => {

        const response = await signSignupUser(props);
        if (response.hasOwnProperty('error')) {
            NotificationManager.error(response.error.message, 'Title');
        } else {
            if (isRegister) {
                const pokemonStart = await fetch('https://reactmarathon-api.herokuapp.com/api/pokemons/starter')
                    .then(res => res.json());

                for (const item of pokemonStart.data) {
                    await fetch(`https://pokemon-game-4f07c-default-rtdb.firebaseio.com/${response.localId}/pokemons.json?auth=${response.idToken}`,
                        {
                            method: 'POST',
                            body: JSON.stringify(item)
                        });
                }
            }
            localStorage.setItem('idToken', response.idToken);
            NotificationManager.success('Success message');
            dispatch(getUserUpdateAsync());
            handleClickLogin();
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
                <LoginForm
                    isResetField={!isOpenModal}
                    onSubmit={handleSubmitLoginForm}
                />
            </Modal>
        </>
    );
}

export default MenuHeader;