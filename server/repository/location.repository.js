const { Location } = require('../model/location.model');

const save = async (location) => {
    return await location.save();
}

const list = async () => {
    return await Location.find({});
}

const getById = async (id) => {
    try {
        return await Location.findOne({ identifier: id });
    } catch (error) {
        throw new Error(`could not find location with id: ${id}`)        
    }
}

const deleteById = async (id) => {
    try {
        return await Location.findOneAndDelete({ identifier: id });
    } catch (error) {
        throw new Error(`could not delete location with id: ${id}`)        
    }
}

const updateLocationById = async (id, locationData) => {
    const options = { new: true };
    return await Location.findOneAndUpdate({ identifier: id }, locationData, options);
}

const create = async (locationData) => {
    const newLocation = new Location(locationData);
    return await save(newLocation);
}


module.exports = {
    save,
    list,
    create,
    getById,
    deleteById,
    updateLocationById,
};