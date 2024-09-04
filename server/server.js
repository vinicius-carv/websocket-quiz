const app = require('./app');
const db = require('./models');

const port = 5000;

db.sequelize.sync().then(async () => {

    console.log('Database synced!');

}).catch(err => {
    console.error('Error syncing database:', err);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
