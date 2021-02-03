import cn from 'classnames';

import navbarStyle from './navbar.module.css';

const Navbar = ({ isActive = false, changeMenu }) => { 
    const handleOpenMenu = ()=>{
        changeMenu();
    }
    return (

        <nav id={navbarStyle.navbar}>
            <div className={navbarStyle.navWrapper}>
                <p className={navbarStyle.brand}>
                    LOGO
                </p>
                <span className={cn(navbarStyle.menuButton, { [navbarStyle.active]: isActive })}>
                    <span  onClick = {handleOpenMenu}/>
                </span>
            </div>
        </nav>
    );
}

export default Navbar;