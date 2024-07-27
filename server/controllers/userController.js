const bcrypt = require('bcrypt');
const db = require('../models');

exports.createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await db.User.create({
            name,
            email,
            password: hashedPassword,
        });

        res.json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await db.User.findAll();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const user = await db.User.findByPk(req.params.id);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        let hashedPassword;
        if (password) {
            hashedPassword = await bcrypt.hash(password, 10);
        }

        const [updated] = await db.User.update({
            name,
            email,
            password: hashedPassword,
        }, {
            where: { id: req.params.id },
        });

        if (updated) {
            const updatedUser = await db.User.findByPk(req.params.id);
            res.json(updatedUser);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const deleted = await db.User.destroy({
            where: { id: req.params.id },
        });
        if (deleted) {
            res.json({ message: 'User deleted' });
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await db.User.findOne({ where: { email } });
        if (user) {
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (isPasswordValid) {
                res.status(200).json({ message: 'Login successful', userId: user.id });
            } else {
                res.status(401).json({ message: 'Invalid password' });
            }
        } else {
            res.status(401).json({ message: 'Invalid user' });
        }
    } catch (err) {
        console.error('Error during login:', err);
        res.status(500).json({ error: 'An error occurred during login' });
    }
};
