module.exports = ({ boxRepository, locationRepository, activityRepository }) => {
    return ({
        getAllOrders: async () => {
            return await boxRepository.list();
        },
        getOrderById: async (id) => {
            return await boxRepository.getById(id);
        },
        createNewOrder: async (orderData) => {
            const { description, activityId, originId, destinationId } = orderData;

            const origin = await locationRepository.getById(originId);
            const destination = await locationRepository.getById(destinationId);

            const activity = await activityRepository.getById(activityId);

            return boxRepository.create({ description, origin, destination, activity });
        },
        createNewOrders: async (orderData) => {
            if (orderData.length < 1) {
                throw new Error("You must provide at least one order");
            }

            const newOrders = [];
            
            for(let orderIndex in orderData) {
                const { description, activityId, originId, destinationId } = orderData[orderIndex];

                const origin = await locationRepository.getById(originId);
                const destination = await locationRepository.getById(destinationId);
                const activity = await activityRepository.getById(activityId);

                newOrders.push({ description, activity, origin, destination })
            }

            return boxRepository.createMany(newOrders);

        },
        updateOrder: async (id, orderData) =>{
            const { description, activityId, originId, destinationId } = orderData;

            const updatedFields = {};

            if(description)
                updatedFields.description = description
            if(originId)
                updatedFields.origin = await locationRepository.getById(originId);
            if(destinationId)
                updatedFields.destination = await locationRepository.getById(destinationId);
            if(activityId)
                updatedFields.activity = await activityRepository.getById(activityId);

            return boxRepository.updateById(id, updatedFields);
        },
        deleteOrder: async (id) => {
            await boxRepository.getById(id);
            return await boxRepository.deleteById(id);
        }
    })
}