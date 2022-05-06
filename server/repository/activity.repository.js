const { Activity } = require('../model/activity.model');

const save = async (activity) => {
    return await activity.save();
}

const list = async () => {
    return await Activity.find({});
}

const getById = async (id) => {
    try {
        return await Activity.findById(id);
    } catch (error) {
        throw new Error(`could not find activity with id: ${id}`)        
    }
}

const deleteById = async (id) => {
    try {
        return await Activity.findByIdAndDelete(id);
    } catch (error) {
        throw new Error(`could not delete activity with id: ${id}`)        
    }
}

const updateActivity = async (id, activityCodeData) => {
    const options = { new: true };
    return await Activity.findByIdAndUpdate(id, activityCodeData, options);
}

const create = async (activityData) => {
    const newActivity = new Activity(activityData);
    return await save(newActivity);
}


module.exports = {
    save,
    list,
    create,
    getById,
    deleteById,
    updateActivity,
};