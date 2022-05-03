const { History } = require('../model/history.model');

const save = async (history) => {
    return await history.save();
}

const list = async () => {
    return await History.find({});
}

const getById = async (id) => {
    try {
        return await History.findById(id);
    } catch (error) {
        throw new Error(`could not find history with id: ${id}`)        
    }
}

const deleteById = async (id) => {
    try {
        return await History.findByIdAndDelete(id);
    } catch (error) {
        throw new Error(`could not delete history with id: ${id}`)        
    }
}

const updateHistory = async (id, historyData) => {
    const options = { new: true };
    return await History.findByIdAndUpdate(id, historyData, options);
}

const create = async (historyData) => {
    const newHistory = new History(historyData);
    return await save(newHistory);
}


module.exports = {
    save,
    list,
    create,
    getById,
    deleteById,
    updateHistory,
};