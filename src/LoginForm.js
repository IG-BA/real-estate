import React, { useState } from 'react';
import axios from 'axios';

export default function Login({ setUser }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        if (!username || !password) {
            setError('Усі поля обов’язкові');
            return;
        }

        try {
            // Надсилаємо логін-запит
            await axios.post(
                'http://localhost:5000/api/login',
                { username, password },
                { withCredentials: true }
            );

            // Після успішного логіну запитуємо дані користувача
            const res = await axios.get('http://localhost:5000/api/user', {
                withCredentials: true,
            });

            // Зберігаємо користувача у стан
            setUser(res.data.user);

        } catch (err) {
            setError(err.response?.data?.message || 'Невірний логін або пароль');
        }
    };

    return (
        <div className="container mt-5">
            <h2>Вхід</h2>
            {error && <div className="alert alert-danger">{error}</div>}

            <form onSubmit={handleLogin}>
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
                <button className="btn btn-primary" type="submit">
                    Увійти
                </button>
            </form>
        </div>
    );
}
