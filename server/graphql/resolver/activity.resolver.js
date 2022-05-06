const activityRepository = require('../../repository/activity.repository');
const activityService = require('../../service/activity.service');

const activityServiceMongo = activityService({ activityRepository });

module.exports = {
    list: async () => {
        return await activityServiceMongo.getAllActivities();
    },
    getById: async (id) => {
        return await activityServiceMongo.getActivityById(id);
    },
    createActivity: async (activityData) => {
        return await activityServiceMongo.create(activityData)
    },
    updateActivity: async (id, activityData) => {
        return await activityServiceMongo.updateActivityById(id, activityData)
    },
    deleteActivity: async (id) => {
        await activityServiceMongo.deleteActivityById(id)
        return { message: "activity was successfully deleted" };
    },
}