
const locationRepository = require('../../repository/location.repository');
const locationService = require('../../service/location.service');

const locationServiceMongo = locationService({ locationRepository });

module.exports = {
    list: async (req, res, next) => {
        try {
            const locations = await locationServiceMongo.getAllLocations();
            return res.json({ locations })
        } catch (error) {
            next(error);
        }
    },
    getById: async (req, res, next) => {
        try {
            const { locationId } = req.params;
            const location = await locationServiceMongo.getLocationById(locationId);
            return res.json(location);
        } catch (error) {
            next(error);
        }
    },
    create: async (req, res, next) => {
        try {
            const location = await locationServiceMongo.createNewLocation(req.body);
    
        return res.json({
            message: "Location successfully created",
            location
        });
        } catch (error) {
            next(error);
        }
    },
    deleteById: async (req, res, next) => {
        try {
            const { locationId } = req.params;
            await locationServiceMongo.deleteLocationById(locationId);
            return res.json({
                message: `successfully deleted location with id: ${locationId}`
            })
        } catch (error) {
            next(error);
        }
    },
    updateById: async (req, res, next) => {
        try {
            const { locationId } = req.params;
            const location = await locationServiceMongo.updateLocationById(locationId, req.body);
            return res.json({
                message: `successfully updated location with id: ${locationId}`,
                location
            })
        } catch (error) {
            next(error);
        }
    }
}