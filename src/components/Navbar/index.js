import cn from 'classnames';

import navbarStyle from './navbar.module.css';
import { ReactComponent as LoginSVG } from '../../images/login.svg'

const Navbar = ({ isOpen = false, bgActive = false, onClickHamburg, onClickLogin }) => {
    const handleOpenMenu = () => {
        onClickHamburg();
    }
    return (

        <nav id={navbarStyle.navbar} className={cn({ [navbarStyle.bgActive]: bgActive })}>
            <div className={navbarStyle.navWrapper}>
                <p className={navbarStyle.brand}>
                    LOGO
                </p>
                <div className={navbarStyle.loginAndMenu}>
                    <div className={navbarStyle.loginWrap}
                    onClick={onClickLogin}>
                        <LoginSVG />
                    </div>
                    <div className={cn(navbarStyle.menuButton, { [navbarStyle.active]: isOpen })}
                        onClick={handleOpenMenu}>
                        <span />
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;