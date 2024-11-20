const User = require('../models/User');
const userService = require('../services/user.service');

const { triggerUserRegistered } = require('../events/user.event');

exports.registerUser = async (req, res) => {
    const user = await createUser(req.body);
    triggerUserRegistered(user);
    res.status(201).json(user);
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createUser = async (req, res) => {
    try {
        const { username, password, email } = req.body;
        const newUser = await userService.createUser({ username, password, email });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

exports.getUserById = async (req, res) => {
    try {
        const user = await userService.getUserById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.updateUser = async (req, res) => {
    const { username, password, email } = req.body;
    try {
        const user = await userService.updateUser(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        user.username = username || user.username;
        user.password = password || user.password;
        user.email = email || user.email;
        await user.save();
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const user = await userService.deleteUser(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        await user.destroy();
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.renderUserPage = async (req, res) => {
    try {
        const users = await userService.renderUserPage();
        res.render('users', { users });
    }catch(error){
        res.status(500).send('Error rendering page: ' + error.message);
    }
};