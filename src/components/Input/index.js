import s from './style.module.css';
import cn from 'classnames';

const Input = ({ type = 'text', name, label, value, onChange }) => {
    return (
        <div className={s.root}>

            <input
                type={type}
                className={cn(s.input, { [s.valid]: value })}
                required={!value}
                value={value}
                onChange={onChange}
                name={name}
            />
            <span className={s.highlight}></span>
            <span className={s.bar}></span>
            <label
                className={s.label}
                htmlFor={name}
            >
                {label}
            </label>
        </div>
    );
};
export default Input;