const bcrypt = require('bcrypt');

exports.hashPassowrd = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

exports.comparePassword = async (password, hash) => {
    return await bcrypt.compare(password, hash);
}