const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./models');
const bcrypt = require('bcrypt');

const app = express();
const port = 5000;

// Enable CORS
app.use(cors());

// Body parser middleware
app.use(bodyParser.json());

// Sync database
db.sequelize.sync().then(() => {
    console.log('Database synced!');
});

// Create a new user
app.post('/users', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the user
        const user = await db.User.create({
            name,
            email,
            password: hashedPassword,
        });

        res.json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Get all users
app.get('/users', async (req, res) => {
    const users = await db.User.findAll();
    res.json(users);
});

// Get a user by ID
app.get('/users/:id', async (req, res) => {
    const user = await db.User.findByPk(req.params.id);
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ error: 'User not found' });
    }
});

// Update a user by ID
app.put('/users/:id', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // If a new password is provided, hash it
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
            individualHooks: true, // Ensures beforeUpdate hook runs if you have it set up
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
});

// Delete a user by ID
app.delete('/users/:id', async (req, res) => {
    const deleted = await db.User.destroy({
        where: { id: req.params.id },
    });
    if (deleted) {
        res.json({ message: 'User deleted' });
    } else {
        res.status(404).json({ error: 'User not found' });
    }
});

// Simple login route
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await db.User.findOne({ where: { email } });
        if (user) {
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (isPasswordValid) {
                res.status(200).json({ message: 'Login successful' });
            } else {
                res.status(401).json({ message: 'Invalid credentials' });
            }
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (err) {
        res.status(500).json({ error: 'An error occurred during login' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
