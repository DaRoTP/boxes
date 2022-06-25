module.exports = ({ locationRepository }) => {
  return {
    createNewLocation: (locationData) => {
      const { country, city, street, number, postcode, identifier, email, phone1, phone2 } = locationData;
      return locationRepository.create({ country, city, street, number, postcode, identifier,  email, phone1, phone2 });
    },
    getAllLocations: async ({ query }) => {
      let locations = await locationRepository.list();

      if (query) {
        locations = locations.filter((location) => {
          return location.identifier.toLowerCase().includes(query.toLowerCase());
        });
      }

      return locations;
    },
    getLocationById: async (id) => {
      const location = await locationRepository.getById(id);
      if (!location) {
        throw new Error(`could not find location with id: ${id}`);
      }
      return location;
    },
    getLocationContactInfo: async (id) => {
      const contactInfo = await locationRepository.getContactInfo(id);
      if (!contactInfo) {
        throw new Error(`could not find location with id: ${id}`);
      }
      return contactInfo;
    },
    deleteLocationById: (id) => {
      return locationRepository.deleteById(id);
    },
    updateLocationById: (id, locationData) => {
      const { country, city, street, number, postcode, identifier, email, phone1, phone2 } = locationData;
      const locationDataFields = { country, city, street, number, postcode, identifier,  email, phone1, phone2 };
      return locationRepository.updateLocationById(id, locationDataFields);
    },
  };
};
