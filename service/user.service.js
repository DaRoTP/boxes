
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const ENV = require('../conf/env.conf');

module.exports = ({ userRepository }) => {
    return ({
        createNewUser: async (userData) => {
            const { username, password } = userData;

            const users = await userRepository.list({ username });
            if(users.length > 0) {
                throw new Error(`user with username: ${username} already exists`);
            }
            const hashedPassword = await bcrypt.hash(password, 12);

            return userRepository.create({ username, password: hashedPassword });
        },
        login: async (userData) => {
            const { username, password } = userData;

            // find user that is trying to login
            const users = await userRepository.list({ username });
            if(users.length < 1) {
                throw new Error(`user with username: ${username} does not exists`);
            }

            // check if password is correct
            const isEqual = await bcrypt.compare(password, users[0].password);
            if (!isEqual) {
              throw new Error('password is incorrect');
            }

            // sign a jwt and send it back
            const user = { username: users[0].username, _id: users[0]._id };
            const jwtOptions = { expiresIn: '1h' }
            const token = jwt.sign(user, ENV.JWT_SECRET, jwtOptions);

            return { token, user };
        },
        getAllUsers: () => {
            return userRepository.list();
        },
        getUserByID: async (id) => {
            const user = await userRepository.getById(id);
            if(!user) {
                throw new Error(`could not find user with id: ${id}`);
            }
            return user;
        },
        deleteUserById: (id) => {
            return userRepository.deleteById(id);
        },
        updateUseryById: (id, activityData) => {
            const { username, password } = activityData;
            const userFields = { username, password };
            return userRepository.updateUser(id, userFields);
        }
    })
}