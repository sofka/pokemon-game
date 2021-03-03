import { useState } from 'react';
import Input from '../Input';
import { useDispatch, useSelector } from 'react-redux';

import { clearEmailAndPassword, emailData, passwordData, setEmailData, setPasswordData } from '../../store/user';

import s from './style.module.css'

const LoginForm = ({ onSubmit }) => {
    const email = useSelector(emailData);
    const password = useSelector(passwordData);
    console.log(email);
    const dispatch = useDispatch();
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit && onSubmit({
            email,
            password
        });

        dispatch(clearEmailAndPassword());
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <Input
                    type="email"
                    name="email"
                    value={email}
                    label="Email"
                    onChange={(e) => dispatch(setEmailData(e.target.value))}
                />
            </div>
            <div>
                <Input
                    type="password"
                    name="password"
                    label="Password"
                    value={password}
                    onChange={(e) => dispatch(setPasswordData(e.target.value))}

                />
            </div>

            <button >
                Login
            </button>
        </form>
    );
};

export default LoginForm;