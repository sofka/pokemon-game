import { useState } from 'react';
import LoginForm from '../LoginForm';
import Menu from '../Menu';
import Modal from '../Modal';
import Navbar from '../Navbar';

const MenuHeader = ({ bgActive }) => {
    const [isOpen, setOpen] = useState(null);
    const [isOpenModal, setOpenModal] = useState(true);
    const handleClickHamburg = () => {
        setOpen(prevState => !prevState);
    }
    const handleClickLogin = () => {
        setOpenModal(prevState => !prevState);
    }

    const handleSubmitLoginForm = (values) => {
        console.log(values);
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