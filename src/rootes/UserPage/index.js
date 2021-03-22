import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/user";
import cn from 'classnames';
import s from './style.module.css';

const UserPage = () => {
    const user = useSelector(selectUser);

    return (
        <div>
            <h1> Страница пользователя</h1>
            {
                Object.entries(user).map((item) => (
                    <div className={s.row}>
                        <div className={cn(s.col, s.col_bold)}>{item[0]}</div>

                        <div className={s.col}>{Array.isArray(item[1]) ? '-' : item[1]}</div>
                    </div>
                )

                )
            }
        </div>
    )
}
export default UserPage;