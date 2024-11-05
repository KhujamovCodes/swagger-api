// auth/auth.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const secretKey = 'your-secret-key'; // Token yaratish uchun kalit
const users = {}; // Foydalanuvchilarni saqlash uchun vaqtinchalik obyekt (bazani almashtiradi)

// Token yaratish funksiyasi
function generateToken(username) {
    return jwt.sign({ username }, secretKey, { expiresIn: '1h' });
}

// Ro'yxatdan o'tish funksiyasi
async function register(username, password) {
    if (users[username]) {
        throw new Error('User already exists');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    users[username] = { password: hashedPassword };
    return { message: 'User registered successfully' };
}

// Login funksiyasi
async function login(username, password) {
    const user = users[username];
    if (!user) {
        throw new Error('User not found');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error('Invalid password');
    }
    const token = generateToken(username);
    return { token };
}

// Tokenni tekshirish uchun middleware
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.sendStatus(401);

    jwt.verify(token, secretKey, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

module.exports = {
    register,
    login,
    authenticateToken
};