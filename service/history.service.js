

module.exports = ({ historyRepository }) => {
    return ({
        createNewHistoryEntry: (historyData) => {
            const { currentLocationId, timeStamp } = historyData;
            return historyRepository.create({ currentLocationId, timeStamp });
        },
        getAllHistoryEntries: () => {
            return historyRepository.list();
        },
        getHsitoryEntryById: async (id) => {
            const historyEntry = await historyRepository.getById(id);
            if(!location) {
                throw new Error(`could not find history entry with id: ${id}`);
            }
            return historyEntry;
        },
        deleteHistoryEntryById: (id) => {
            return historyRepository.deleteById(id);
        },
        updateHistoryEntryById: (id, historyData) => {
            const { currentLocationId, timeStamp } = historyData;
            return historyRepository.updateHistory(id, { currentLocationId, timeStamp });
        }
    })
}