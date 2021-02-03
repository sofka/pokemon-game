import cn from 'classnames';
import links from './links';
import menuStyle from './menu.module.css';

const Menu = ({ deActive }) => {
    return (
        <div className={cn(menuStyle.menuContainer, { [menuStyle.active]: !deActive }, { [menuStyle.deactive]: deActive })}>
            <div className={menuStyle.overlay} />
            <div className={menuStyle.menuItems}>
                <ul>
                    {links.map((item, index) => {
                        return (
                            <li key={index}>
                                <a href={`#${item.href}`}>
                                    {item.name}
                                </a>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
}
export default Menu;