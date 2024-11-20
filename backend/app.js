const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user.Routes');
const sequelize = require('./db');

const app = express();
app.use(bodyParser.json());

app.set('view engine', 'ejs');
app.set('views', './views');

app.use('/api/users', userRoutes);
app.use('/api/user/:id', userRoutes);

(async () => {
    try{ 
        await sequelize.sync();
        console.log('Database synced.');
    }catch(error){
        console.error('Error syncing database:', error.message);
    }
})();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));