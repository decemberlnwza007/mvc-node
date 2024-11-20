exports.getUserWithPagination = async (page, size) => {
    const limit = size || 10;
    const offset = page ? (page - 1) * limit : 0;

    return await User.findAndCountAll({ limit, offset });
};