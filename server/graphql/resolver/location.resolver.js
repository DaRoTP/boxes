const locationService = require("../../service/location.service");
const locationRepository = require('../../repository/location.repository');
const paginate = require("../../utils/paginate");

const locationServiceMongo = locationService({ locationRepository });

module.exports = {
    list: async (_, args) => {
        const { query, page, perPage } = args;
        const locations = await locationServiceMongo.getAllLocations({ query });
        if (page !== undefined && perPage !== undefined) {
            const { data } = paginate(locations, page, perPage);
            return data
        }
        return locations;
    },
    locationCount: async () => {
        const locations = await locationServiceMongo.getAllLocations({});
        return locations.length;
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