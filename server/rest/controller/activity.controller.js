
const activityRepository = require('../../repository/activity.repository');
const activityService = require('../../service/activity.service');

const activityServiceMongo = activityService({ activityRepository });

module.exports = {
    list: async (req, res, next) => {
        try {
            const activities = await activityServiceMongo.getAllActivities();
            return res.json({ activities })
        } catch (error) {
            next(error);
        }
    },
    getById: async (req, res, next) => {
        try {
            const { activityId } = req.params;
            const activity = await activityServiceMongo.getActivityById(activityId);
            return res.json(activity);
        } catch (error) {
            next(error);
        }
    },
    create: async (req, res, next) => {
        try {
            const activity = await activityServiceMongo.createNewActivity(req.body);
        return res.json({
            message: "Activity successfully created",
            activity
        });
        } catch (error) {
            next(error);
        }
    },
    deleteById: async (req, res, next) => {
        try {
            const { activityId } = req.params;
            await activityServiceMongo.deleteActivityById(activityId);
            return res.json({
                message: `successfully deleted activity with id: ${activityId}`
            })
        } catch (error) {
            next(error);
        }
    },
    updateById: async (req, res, next) => {
        try {
            const { activityId } = req.params;
            const activity = await activityServiceMongo.updateActivityById(activityId, req.body);
            return res.json({
                message: `successfully updated activity with id: ${activityId}`,
                activity
            })
        } catch (error) {
            next(error);
        }
    }
}