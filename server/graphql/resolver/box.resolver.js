const boxService = require("../../service/box.service");

const boxRepository = require('../../repository/box.repository');
const activityRepository = require('../../repository/activity.repository');
const locationRepository = require('../../repository/location.repository');
const historyRepository = require('../../repository/history.repository');


const boxServiceMongo = boxService({ boxRepository, locationRepository, activityRepository, historyRepository });

module.exports = {
    list: async () => {
        return await boxServiceMongo.getAllOrders();
    },
    getById: async (id) => {
        return await boxServiceMongo.getOrderById(id);
    },
    createBox: async (boxData) => {
        if(Array.isArray(boxData)) {
            return await boxServiceMongo.createNewOrders(boxData);
        } else {
            return await boxServiceMongo.createNewOrder(boxData);
        }
    },
    updateBox: async (id, boxData) => {
        return await boxServiceMongo.updateOrder(id, boxData)
    },
    deleteBox: async (id) => {
        await boxServiceMongo.deleteOrder(id)
        return { message: "box was successfully deleted" };
    }
}