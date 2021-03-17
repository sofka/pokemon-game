import cn from 'classnames';

import navbarStyle from './navbar.module.css';
import { ReactComponent as LoginSVG } from '../../images/login.svg'
import { ReactComponent as UserSVG } from '../../images/user.svg'
import { useSelector } from 'react-redux';
import { selectUserLoading, selectLocalId } from '../../store/user';
import { Link } from 'react-router-dom';


const Navbar = ({ isOpen = false, bgActive = false, onClickHamburg, onClickLogin }) => {
    const isLoadingUser = useSelector(selectUserLoading);
    const localId = useSelector(selectLocalId);
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
                    {(!isLoadingUser && !localId) && (
                        <div className={navbarStyle.loginWrap}
                            onClick={onClickLogin}>
                            <LoginSVG />
                        </div>
                    )}
                    {(!isLoadingUser && localId) && (
                        <Link className={navbarStyle.loginWrap}
                            to="/user">
                            <UserSVG />
                        </Link>
                    )}

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