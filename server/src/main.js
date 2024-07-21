const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./models');
const bcrypt = require('bcrypt');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

db.sequelize.sync().then(() => {
    console.log('Database synced!');
}).catch(err => {
    console.error('Error syncing database:', err);
});

// create user
app.post('/users', async (req, res) => {
    try {
        console.log('Received request body:', req.body);
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await db.User.create({
            name,
            email,
            password: hashedPassword,
            plainPassword: password,
        });

        console.log('Created user:', user);
        res.json(user);
    } catch (err) {
        console.error('Error creating user:', err);
        res.status(400).json({ error: err.message });
    }
});

// fetch all users
app.get('/users', async (req, res) => {
    try {
        const users = await db.User.findAll();
        res.json(users);
    } catch (err) {
        console.error('Error fetching users:', err);
        res.status(500).json({ error: err.message });
    }
});

// get user by id
app.get('/users/:id', async (req, res) => {
    try {
        const user = await db.User.findByPk(req.params.id);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (err) {
        console.error('Error fetching user by ID:', err);
        res.status(500).json({ error: err.message });
    }
});

// update user by id
app.put('/users/:id', async (req, res) => {
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
        console.error('Error updating user:', err);
        res.status(400).json({ error: err.message });
    }
});

// delete user by id
app.delete('/users/:id', async (req, res) => {
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
        console.error('Error deleting user:', err);
        res.status(500).json({ error: err.message });
    }
});

// TODO: Fix login issue
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    console.log('Received request body:', req.body);
    try {
        const user = await db.User.findOne({ where: { email } });
        if (user) {
            console.log('User found:', user);
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (isPasswordValid) {
                console.log('Login successful');
                res.status(200).json({ message: 'Login successful' });
            } else {
                console.log('Invalid password');
                res.status(401).json({ message: `Invalid credentials, password in ${password}, real password: ${user.plainPassword}` });
            }
        } else {
            console.log('User not found');
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (err) {
        console.error('Error during login:', err);
        res.status(500).json({ error: 'An error occurred during login' });
    }
});
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
