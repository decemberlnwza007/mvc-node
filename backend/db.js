require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'mysql',
    },
);

(async () => {
    try {
        await sequelize.authenticate();
        console.log('Connected Database Successfully!');
    } catch (error) {   
        console.error('Unable to Connected Database:', error.message )
    }
})

module.exports = sequelize;