import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import axios from 'axios';
import Login from './LoginForm';
import Register from './RegisterForm';
import PropertyList from './PropertyList';


function App() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('http://localhost:5000/api/user', { withCredentials: true })
            .then(res => setUser(res.data.user))
            .catch(() => setUser(null))
            .finally(() => setLoading(false));
    }, []);

    const handleLogout = async () => {
        await axios.post('http://localhost:5000/api/logout', {}, { withCredentials: true });
        setUser(null);
    };

    if (loading) return <div>Завантаження...</div>;

    return (
        <Router>
            <div className="container mt-3">
                <nav className="mb-3">
                    {user ? (
                        <>
                            <span className="me-3">👋 {user.username}</span>
                            <button className="btn btn-outline-secondary" onClick={handleLogout}>Вийти</button>
                        </>
                    ) : (
                        <>
                            <Link className="btn btn-primary me-2" to="/login">Вхід</Link>
                            <Link className="btn btn-secondary" to="/register">Реєстрація</Link>
                        </>
                    )}
                </nav>

                <Routes>
                    <Route path="/proplist" element={user ? <PropertyList /> : <Navigate to="/login" />} />
                    <Route path="/login" element={!user ? <Login setUser={setUser} /> : <Navigate to="/proplist" />} />
                    <Route path="/register" element={!user ? <Register /> : <Navigate to="/proplist" />} />
                    <Route path="/" element={<Navigate to={user ? "/proplist" : "/login"} />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;