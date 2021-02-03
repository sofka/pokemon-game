import cn from 'classnames';

import navbarStyle from './navbar.module.css';

const Navbar = ({ isOpen = false, bgActive = false, onClickHamburg }) => {
    const handleOpenMenu = () => {
        onClickHamburg();
    }
    return (

        <nav id={navbarStyle.navbar} className={cn({ [navbarStyle.bgActive]: bgActive })}>
            <div className={navbarStyle.navWrapper}>
                <p className={navbarStyle.brand}>
                    LOGO
                </p>
                <div className={cn(navbarStyle.menuButton, { [navbarStyle.active]: isOpen })}
                onClick={handleOpenMenu}>
                    <span  />
                </div>
            </div>
        </nav>
    );
}

export default Navbar;