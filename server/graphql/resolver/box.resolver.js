const boxService = require("../../service/box.service");

const boxRepository = require('../../repository/box.repository');
const activityRepository = require('../../repository/activity.repository');
const locationRepository = require('../../repository/location.repository');
const paginate = require("../../utils/paginate");


const boxServiceMongo = boxService({ boxRepository, locationRepository, activityRepository });

module.exports = {
    list: async (_, args) => {
        const { page, perPage } = args;
        const boxes = await boxServiceMongo.getAllOrders();
        if (page !== undefined && perPage !== undefined) {
            const { data } = paginate(boxes, page, perPage);
            return data
        }
        return boxes;
    },
    boxesCount: async () => {
        const boxes = await boxServiceMongo.getAllOrders();
        return boxes.length;
    },
    getById: async (id) => {
        return await boxServiceMongo.getOrderById(id);
    },
    getBoxHistoryById: async (_, args) => {
        const { id } = args;
        const {history} = await boxServiceMongo.getAllHistoryEntriesOfABox(id);
        return history;
    },
    transferBox: async (_, args) => {
        const { id, targetLocationId, activityId } = args;
        const data = await boxServiceMongo.transferBox(id, targetLocationId, activityId );
        console.log(data)
        return data;
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