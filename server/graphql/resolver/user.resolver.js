const userRepository = require('../../repository/user.repository');
const userService = require('../../service/user.service');

const userServiceMongo = userService({ userRepository });

module.exports = {
    login: async (parent, args) => {
        const { username, password } = args;
        return await userServiceMongo.login({ username, password });
    },
    register: async (parent, args) => {
        const { username, password } = args;
        return await userServiceMongo.createNewUser({ username, password });
    },
}