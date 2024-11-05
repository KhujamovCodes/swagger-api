// controllers/authController.js

/**
 * @swagger
 * tags:
 *   name: AuthController
 *   description: Auth uchun Controller
 */

const register = (req, res) => {
    // Ro'yxatdan o'tish logikasi
    res.send("User registered");
};

const login = (req, res) => {
    // Login logikasi
    res.send("User logged in");
};

const saveAdmin = (req, res) => {
    // Admin saqlash logikasi
    res.send("Admin saved");
};

const resetPassword = (req, res) => {
    // Parolni tiklash logikasi
    res.send("Password reset");
};

const forgotPassword = (req, res) => {
    // Parolni eslash logikasi
    res.send("Forgot password email sent");
};

const activate = (req, res) => {
    // Akkauntni faollashtirish logikasi
    res.send("Account activated");
};

module.exports = {
    register,
    login,
    saveAdmin,
    resetPassword,
    forgotPassword,
    activate
};

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: "User registration"
 *     tags: [AuthController]
 *     description: "Bu yoldan faqat user ro'yxatdan o'ta oladi"
 *     responses:
 *       200:
 *         description: "User registered successfully"
 */
 
/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: "User login"
 *     tags: [AuthController]
 *     description: "Bu yoldan user, super_admin va admin login qila oladi"
 *     responses:
 *       200:
 *         description: "User logged in successfully"
 */

/**
 * @swagger
 * /auth/save/admin:
 *   post:
 *     summary: "Save admin"
 *     tags: [AuthController]
 *     description: "Bu yoldan faqat super admin admin qo'sha oladi"
 *     responses:
 *       200:
 *         description: "Admin saved successfully"
 */

/**
 * @swagger
 * /auth/reset-password:
 *   put:
 *     summary: "Reset password"
 *     tags: [AuthController]
 *     description: "User parolini tiklash"
 *     responses:
 *       200:
 *         description: "Password reset successfully"
 */

/**
 * @swagger
 * /auth/forgot-password:
 *   put:
 *     summary: "Forgot password"
 *     tags: [AuthController]
 *     description: "Parolni unutgan foydalanuvchi uchun email yuborish"
 *     responses:
 *       200:
 *         description: "Forgot password email sent"
 */

/**
 * @swagger
 * /auth/activate:
 *   put:
 *     summary: "Activate account"
 *     tags: [AuthController]
 *     description: "Akkauntni faollashtirish"
 *     responses:
 *       200:
 *         description: "Account activated successfully"
 */

