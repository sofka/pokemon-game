import cn from 'classnames';
import { Link } from 'react-router-dom';
import LINKS from './links';
import menuStyle from './menu.module.css';

const Menu = ({ isOpen, onClickHamburg }) => {
    return (
        <div className={cn(menuStyle.menuContainer,
            {
                [menuStyle.active]: isOpen === true,
                [menuStyle.deactive]: isOpen === false
            }, 
        )}>
            <div className={menuStyle.overlay} />
            <div>
                <ul>
                    {LINKS.map((item, index) => {
                        return (
                            <li key={index}>
                                <Link to={item.href} onClick={onClickHamburg}>
                                    {item.name}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
}
export default Menu;