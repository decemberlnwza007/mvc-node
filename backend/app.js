const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user.Routes');
const sequelize = require('./db');

const loggerMiddleware = require('./middlewares/logger.middleware');
const errorMiddleware = require('./middlewares/error.middleware');

const logger = require('./utils/logger.util')

const morgan = require('morgan');
const fs = require('fs');
const path = require('path');

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'logs/access.log'), { flags: 'a' });
app.use(morgan('combined', { stream: accessLogStream }));

const app = express();
app.use(bodyParser.json());

app.set('view engine', 'ejs');
app.set('views', './views');

app.use('/api/users', userRoutes);
app.use('/api/user/:id', userRoutes);

app.use(loggerMiddleware);
app.use(errorMiddleware);

logger.info('This is an informational message');
logger.error('This is an error message');

(async () => {
    try {
        await sequelize.sync();
        console.log('Database synced.');
    } catch (error) {
        console.error('Error syncing database:', error.message);
    }
})();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));