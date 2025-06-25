const express = require('express');
const fs = require('fs');
const path = require('path');
const session = require('express-session');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;
const USERS_FILE = path.join(__dirname, 'users.json');

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(bodyParser.json());
app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // для HTTP, не HTTPS
}));


if (!fs.existsSync(USERS_FILE)) {
    fs.writeFileSync(USERS_FILE, '[]');
}

const getUsers = () => {
    const data = fs.readFileSync(USERS_FILE, 'utf8');
    try {
        return JSON.parse(data);
    } catch {
        return [];
    }
};

const saveUsers = (users) => {
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
};

app.post('/api/register', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Усі поля обовʼязкові' });
    }

    const users = getUsers();
    const exists = users.some(u => u.username === username);

    if (exists) {
        return res.status(409).json({ message: 'Користувач вже існує' });
    }

    users.push({ username, password });
    saveUsers(users);

    console.log(`✅ Зареєстровано: ${username}`);
    res.status(201).json({ message: 'Реєстрація успішна' });
});

app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    const users = getUsers();
    const user = users.find(u => u.username === username && u.password === password);

    if (!user) {
        return res.status(401).json({ message: 'Невірний логін або пароль' });
    }

    req.session.user = { username };
    console.log(`🔓 Увійшов: ${username}`);
    res.json({ message: 'Успішний вхід' });
});

app.get('/api/user', (req, res) => {
    if (req.session.user) {
        res.json({ user: req.session.user });
    } else {
        res.status(401).json({ message: 'Не автентифіковано' });
    }
});

app.post('/api/logout', (req, res) => {
    req.session.destroy();
    res.json({ message: 'Вихід виконано' });
});

app.listen(PORT, () => {
    console.log(`🚀 Сервер працює на http://localhost:${PORT}`);
});
