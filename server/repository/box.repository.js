const { Box } = require('../model/box.model');

const save = async (box) => {
    return await box.save();
}

const list = async () => {
    const fields = ["_id", "description", "origin", "destination", "activity"];
    return await Box.find({}, fields.join(" ")).populate("origin destination activity");
}

const getById = async (id) => {
    const fields = ["_id", "description", "origin", "destination", "activity"];
    try {
        return await Box.findOne({ _id: id }, fields.join(" ")).populate("origin destination activity");
    } catch (error) {
        throw new Error(`could not find box with id: ${id}`)        
    }
}
const getBoxHistoryById = async (id) => {
    try {
        return await Box.findOne({ _id: id }, "history").populate({ 
            path: "history",
            populate: {
                path: "currentLocation activity"
            }
        });
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
    getBoxHistoryById,
};