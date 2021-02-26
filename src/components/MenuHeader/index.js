import { useState } from 'react';
import Menu from '../Menu';
import Modal from '../Modal';
import Navbar from '../Navbar';

const MenuHeader = ({ bgActive }) => {
    const [isOpen, setOpen] = useState(null);
    const [isOpenModal, setOpenModal] = useState(false);
    const handleClickHamburg = () => {
        setOpen(prevState => !prevState);
    }
    const handleClickLogin = () => {
        setOpenModal(prevState => !prevState);
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
                onCloseModal={handleClickLogin}>
                Some text Here
            </Modal>
        </>
    );
}

export default MenuHeader;