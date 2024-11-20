const User = require('../models/User');
const redis = require('../cache/redis.client');

const getCachedUser = async (id) => {
    const cachedUser = await redis.get(`user:${id}`);
    if(cachedUser) return JSON.parse(cachedUser);

    const user = await this.getUserById(id);
    await redis.set(`user:${id}`, JSON.stringify(user), 'EX', 3600);
    return user;
};

exports.getAllUsers = async () => {
    return await User.findAll();
};

exports.getUserById = async (id) => {
    return await User.findByPk();
};

exports.createUser = async (userData) => {
    return await User.create(userData);
};