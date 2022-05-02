

module.exports = ({ activityRepository }) => {
    return ({
        createNewActivity: (activityData) => {
            const { name, code } = activityData;
            return activityRepository.create({ name, code });
        },
        getAllActivities: () => {
            return activityRepository.list();
        },
        getActivityById: async (id) => {
            const location = await activityRepository.getById(id);
            if(!location) {
                throw new Error(`could not find activity with id: ${id}`);
            }
            return location;
        },
        deleteActivityById: (id) => {
            return activityRepository.deleteById(id);
        },
        updateActivityById: (id, activityData) => {
            const { name, code } = activityData;
            const activityDataFields = { name, code };
            return activityRepository.updateActivity(id, activityDataFields);
        }
    })
}