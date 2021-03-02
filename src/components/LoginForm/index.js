import { useState } from 'react';
import Input from '../Input';

import s from './style.module.css'

const LoginForm = ({ onSubmit }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit && onSubmit({
            email,
            password
        });
        setEmail('');
        setPassword('');
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <Input
                    type="email"
                    name="email"
                    value={email}
                    label="Email"
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div>
                <Input
                    type="password"
                    name="password"
                    label="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            <button >
                Login
            </button>
        </form>
    );
};

export default LoginForm;