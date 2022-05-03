const locationService = require("../../service/location.service");
const locationRepository = require('../../repository/location.repository');

const locationServiceMongo = locationService({ locationRepository });

module.exports = {
    list: async () => {
        return await locationServiceMongo.getAllLocations();
    },
    getById: async (locationId) => {
        return await locationServiceMongo.getLocationById(locationId);
    },
    createLocation: async (locationData) => {
        return await locationServiceMongo.createNewLocation(locationData)
    },
    updateLocation: async (id, locationData) => {
        return await locationServiceMongo.updateLocationById(id, locationData)
    },
    deleteLocation: async (id) => {
        await locationServiceMongo.deleteLocationById(id)
        return { message: "location was successfully deleted" };
    },
}