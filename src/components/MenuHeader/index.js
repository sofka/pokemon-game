import { useState } from 'react';
import Menu from '../Menu';
import Navbar from '../Navbar';

const MenuHeader = () => {
    const [isActiveNavbar, changeNavbar] = useState(false);
    const changeMenu = () => {
        changeNavbar(!isActiveNavbar);
    }
    return (
        <>
            <Menu deActive={!isActiveNavbar} />
            <Navbar isActive={isActiveNavbar} changeMenu={changeMenu} />
        </>
    );
}

export default MenuHeader;