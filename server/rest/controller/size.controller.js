
const sizeRepository = require('../../repository/size.repository');
const sizeService = require('../../service/size.service');

const sizeServiceMongo = sizeService({ sizeRepository });

module.exports = {
    list: async (req, res, next) => {
        try {
            const sizes = await sizeServiceMongo.getAllSizes();
            return res.json({ sizes })
        } catch (error) {
            next(error);
        }
    },
    getById: async (req, res, next) => {
        try {
            const { sizeId } = req.params;
            const size = await sizeServiceMongo.getSizeById(sizeId);
            return res.json(size);
        } catch (error) {
            next(error);
        }
    },
    create: async (req, res, next) => {
        try {
            const size = await sizeServiceMongo.createNewSize(req.body);
        return res.json({
            message: "Size successfully created",
            size
        });
        } catch (error) {
            next(error);
        }
    },
    deleteById: async (req, res, next) => {
        try {
            const { sizeId } = req.params;
            await sizeServiceMongo.deleteSizeById(sizeId);
            return res.json({
                message: `successfully deleted activity with id: ${sizeId}`
            })
        } catch (error) {
            next(error);
        }
    },
    updateById: async (req, res, next) => {
        try {
            const { sizeId } = req.params;
            const activity = await sizeServiceMongo.updateSizeById(sizeId, req.body);
            return res.json({
                message: `successfully updated size with id: ${activityId}`,
                activity
            })
        } catch (error) {
            next(error);
        }
    }
}