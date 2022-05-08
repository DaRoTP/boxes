
module.exports = ({ locationRepository }) => {
    return ({
        createNewLocation: (locationData) => {
            const { country, city, street, number, postcode, identifier } = locationData;
            return locationRepository.create({ country, city, street, number, postcode, identifier });
        },
        getAllLocations: async ({ query}) => {
            let locations = await locationRepository.list();


            if(query) {
                locations = locations.filter(location => location.identifier.includes(query))
            }

            return locations;
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
            const { country, city, street, number, postcode, identifier } = locationData;
            const locationDataFields = { country, city, street, number, postcode, identifier };
            return locationRepository.updateLocationById(id, locationDataFields);
        }
    })
}