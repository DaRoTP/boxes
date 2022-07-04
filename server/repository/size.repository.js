const { Size } = require('../model/size.model');

const save = async (size) => {
    return await size.save();
}

const list = async () => {
    return await Size.find({});
}

const getById = async (id) => {
    try {
        return await Size.findOne({ code: id });
    } catch (error) {
        throw new Error(`could not find size with id: ${id}`)        
    }
}

const deleteById = async (id) => {
    try {
        return await Size.findOneAndDelete({ code: id });
    } catch (error) {
        throw new Error(`could not delete size with id: ${id}`)        
    }
}

const updateSize = async (id, sizeData) => {
    const options = { new: true };
    return await Activity.findBy(id, sizeData, options);
}

const create = async (sizeData) => {
    const newSize = new Size(sizeData);
    return await save(newSize)
}


module.exports = {
    save,
    list,
    create,
    getById,
    deleteById,
    updateSize,
};