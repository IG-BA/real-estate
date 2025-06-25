// src/pages/Register.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!username || !password) {
            setError('Усі поля обов’язкові');
            return;
        }

        try {
            await axios.post('http://localhost:5000/api/register', { username, password });
            setSuccess('Реєстрація успішна. Ви можете увійти.');
            setUsername('');
            setPassword('');
            // За бажанням перенаправити на вхід:
            // navigate('/login');
        } catch (err) {
            setError(err.response?.data?.message || 'Помилка при реєстрації');
        }
    };

    return (
        <div className="container mt-5">
            <h2>Реєстрація</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}

            <form onSubmit={handleRegister}>
                <input
                    className="form-control mb-2"
                    placeholder="Логін"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
                <input
                    className="form-control mb-2"
                    placeholder="Пароль"
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <button className="btn btn-success" type="submit">
                    Зареєструватись
                </button>
            </form>
        </div>
    );
}
