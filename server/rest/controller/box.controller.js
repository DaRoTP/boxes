
const activityRepository = require('../../repository/activity.repository');
const locationRepository = require('../../repository/location.repository');
const boxRepository = require('../../repository/box.repository');
const historyRepository = require('../../repository/history.repository');

const boxService = require('../../service/box.service');

const boxServiceMongo = boxService({ activityRepository, locationRepository, boxRepository, historyRepository });

module.exports = {
    list: async (req, res, next) => {
        try {
            const boxes = await boxServiceMongo.getAllOrders();
            return res.json({ boxes });
        } catch (error) {
            next(error);
        }
    },
    getOrder: async (req, res, next) => {
        try {
            const { boxId } = req.params;
            const box = await boxServiceMongo.getOrderById(boxId);
            return res.json(box);
        } catch (error) {
            next(error);
        }
    },
    getBoxHistory: async (req, res, next) => {
        try {
            const { boxId } = req.params;
            const { history } = await boxServiceMongo.getAllHistoryEntriesOfABox(boxId);
            return res.json(history);
        } catch (error) {
            next(error);
        }
    },
    createOrder: async (req, res, next) => {
        try {
            const data = req.body;

            if(Array.isArray(data)) {
                const neBoxOrders = await boxServiceMongo.createNewOrders(data);
                return res.json(neBoxOrders)
            } else {
                const newBoxOrder = await boxServiceMongo.createNewOrder(data);
                return res.json(newBoxOrder)
            }
        } catch (error) {
            next(error);
        }
    },
    updateOrder: async (req, res, next) => {
        try {
            const { boxId } = req.params;
            const updatedOrder = await boxServiceMongo.updateOrder(boxId, req.body);
            return res.json(updatedOrder)
        } catch (error) {
            next(error);
        }
    },
    transferOrder: async (req, res, next) => {
        try {
            const { boxId } = req.params;
            const { targetLocationId } = req.body; 
            const updatedOrder = await boxServiceMongo.transferBox(boxId, targetLocationId);
            return res.json(updatedOrder)
        } catch (error) {
            next(error);
        }
    },
    deleteOrder: async (req, res, next) => {
        try {
            const { boxId } = req.params;
            await boxServiceMongo.deleteOrder(boxId);
            return res.json({ message: "successfully deleted order" })
        } catch (error) {
            next(error);
        }
    }
}