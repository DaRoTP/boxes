

module.exports = ({ locationRepository }) => {
    return ({
        createNewLocation: (locationData) => {
            const { country, city, street, number, postcode } = locationData;
            return locationRepository.create({ country, city, street, number, postcode });
        },
        getAllLocations: () => {
            return locationRepository.list();
        },
        getLocationById: async (id) => {
            const location = await locationRepository.getById(id);
            if(!location) {
                throw new Error(`could not find location with id: ${id}`);
            }
            return location;
        },
        deleteLocationById: (id) => {
            return locationRepository.deleteById(id);
        },
        updateLocationById: (id, locationData) => {
            const { country, city, street, number, postcode } = locationData;
            const locationDataFields = { country, city, street, number, postcode };
            return locationRepository.updateLocationById(id, locationDataFields);
        }
    })
}