import cn from 'classnames';

import menuStyle from './menu.module.css';

const Menu = ({ deActive }) => {
    return (
        <div className={cn(menuStyle.menuContainer, { [menuStyle.active]: !deActive }, { [menuStyle.deactive]: deActive })}>
            <div className={menuStyle.overlay} />
            <div className={menuStyle.menuItems}>
                <ul>
                    <li>
                        <a href="#welcome">
                            HOME
                        </a>
                    </li>
                    <li>
                        <a href="#game">
                            GAME
                        </a>
                    </li>
                    <li>
                        <a href="#about">
                            ABOUT
                        </a>
                    </li>
                    <li>
                        <a href="#contact">
                            CONTACT
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
}
export default Menu;