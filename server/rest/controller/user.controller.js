
const userRepository = require('../../repository/user.repository');
const userService = require('../../service/user.service');

const userServiceMongo = userService({ userRepository });

module.exports = {
    list: async (req, res, next) => {
        try {
            const users = await userServiceMongo.getAllUsers();
            return res.json({ users })
        } catch (error) {
            next(error);
        }
    },
    login: async (req, res, next) => {
        try {
            const loginRes = await userServiceMongo.login(req.body);
            return res.json(loginRes);
        } catch (error) {
            next(error);
        }
    },
    getLoggedInuUser: async (req, res, next) => {
        try {
            const userId = req.userId;
            const user = await userServiceMongo.getUserByID(userId);
            return res.json({ _id: user._id, username: user.username });
        } catch (error) {
            next(error);
        }
    },
    getById: async (req, res, next) => {
        try {
            const { userId } = req.params;
            const user = await userServiceMongo.getUserByID(userId);
            return res.json(user);
        } catch (error) {
            next(error);
        }
    },
    create: async (req, res, next) => {
        try {
            const user = await userServiceMongo.createNewUser(req.body);
        return res.json({
            message: "User successfully created",
            user
        });
        } catch (error) {
            next(error);
        }
    },
    deleteById: async (req, res, next) => {
        try {
            const { userId } = req.params;
            await userServiceMongo.deleteUserById(userId);
            return res.json({
                message: `successfully deleted user with id: ${userId}`
            })
        } catch (error) {
            next(error);
        }
    },
    updateById: async (req, res, next) => {
        try {
            const { userId } = req.params;
            const user = await userServiceMongo.updateUseryById(userId, req.body);
            return res.json({
                message: `successfully updated user with id: ${userId}`,
                user
            })
        } catch (error) {
            next(error);
        }
    }
}