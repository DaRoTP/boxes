const { Box } = require('../model/box.model');

const save = async (box) => {
    return await box.save();
}

const list = async () => {
    return await Box.find({});
}

const getById = async (id) => {
    try {
        return await Box.findById(id);
    } catch (error) {
        throw new Error(`could not find box with id: ${id}`)        
    }
}

const deleteById = async (id) => {
    try {
        return await Box.findByIdAndDelete(id);
    } catch (error) {
        throw new Error(`could not delete box with id: ${id}`)        
    }
}

const updateById = async (id, boxData) => {
    const options = { new: true };
    return await Box.findByIdAndUpdate(id, boxData, options);
}

const create = async (boxData) => {
    const newBox = new Box(boxData);
    return await save(newBox);
}

const createMany = async (boxesData) => {
    return await Box.insertMany(boxesData);
}


module.exports = {
    save,
    list,
    create,
    getById,
    deleteById,
    updateById,
    createMany,
};