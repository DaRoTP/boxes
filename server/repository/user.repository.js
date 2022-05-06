const { User } = require('../model/user.model');

const save = async (user) => {
    return await user.save();
}

const list = async (query = {}) => {
    return await User.find(query);
}

const getById = async (id) => {
    try {
        return await User.findById(id);
    } catch (error) {
        throw new Error(`could not find user with id: ${id}`)        
    }
}

const deleteById = async (id) => {
    try {
        return await User.findByIdAndDelete(id);
    } catch (error) {
        throw new Error(`could not delete user with id: ${id}`)        
    }
}

const updateUser = async (id, userData) => {
    const options = { new: true };
    return await User.findByIdAndUpdate(id, userData, options);
}

const create = async (userData) => {
    const newUser = new User(userData);
    return await save(newUser);
}


module.exports = {
    save,
    list,
    create,
    getById,
    deleteById,
    updateUser,
};