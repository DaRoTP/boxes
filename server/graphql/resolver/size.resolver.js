const sizeRepository = require("../../repository/size.repository");
const sizeService = require("../../service/size.service");

const sizeServiceMongo = sizeService({ sizeRepository });

module.exports = {
  list: async () => {
    return await sizeServiceMongo.getAllSizes();
  },
  getById: async (id) => {
    return await sizeServiceMongo.getSizeById(id);
  },
  createSize: async (activityData) => {
    return await sizeServiceMongo.createNewSize(activityData);
  },
  updateSize: async (id, activityData) => {
    return await sizeServiceMongo.updateSizeById(id, activityData);
  },
  deleteSize: async (id) => {
    await sizeServiceMongo.deleteSizeById(id);
    return { message: "size was successfully deleted" };
  },
};
