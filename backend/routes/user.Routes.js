const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.Controller');
const authMiddleware = require('../middlewares/auth.middleware');
const upload = require('../middlewares/upload.middleware');

router.get('/protected', authMiddleware, (req, res) => {
    res.json({ message: `Welcome, ${req.user.name}` });
});

router.post('/upload', upload.single('file'), (req, res) => {
    res.send({ filePath: req.file.path });
});

router.get('/', userController.getAllUsers);
router.post('/', userController.createUser);
router.get('/:id', userController.getUserById);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

router.get('/view', userController.renderUserPage);

module.exports = router;