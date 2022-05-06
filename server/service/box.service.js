module.exports = ({ boxRepository, locationRepository, activityRepository, historyRepository }) => {
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

            const locationHistoryData = { currentLocation: origin, timeStamp: new Date()} 
            const locationHistory = await historyRepository.create(locationHistoryData);

            const newBox = await boxRepository.create({ description, origin, destination, activity, history: [locationHistory] });

            return { 
                _id: newBox._id,
                description: newBox.description,
                origin: newBox.origin,
                destination: newBox.destination,
                activity: newBox.activity 
            }
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

                const locationHistoryData = { currentLocation: origin, timeStamp: new Date()} 
                const locationHistory = await historyRepository.create(locationHistoryData);

                newOrders.push({ description, activity, origin, destination, history: [locationHistory] })
            }

            const savedOrders = await boxRepository.createMany(newOrders);

            return savedOrders.map(({ _id, description, origin, destination, activity }) => ({ _id, description, origin, destination, activity }))

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
        },
        transferBox: async (id, targetLocationId) => {
            const box = await boxRepository.getById(id);
            const targetLocation = await locationRepository.getById(targetLocationId);

            const locationHistoryData = { currentLocation: targetLocation, timeStamp: new Date()} 
            const locationHistory = await historyRepository.create(locationHistoryData);

            box.history.push(locationHistory);

            boxRepository.save(box);
        },
        getAllHistoryEntriesOfABox: (id) => {
            return boxRepository.getBoxHistoryById(id)
        },
    })
}