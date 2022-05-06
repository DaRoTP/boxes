
const boxRepository = require('../../repository/box.repository');
const historyRepository = require('../../repository/history.repository');
const histryService = require('../../service/history.service');

const historyServiceMongo = histryService({ boxRepository, historyRepository });

module.exports = {
    list: async (req, res, next) => {
        try {
            const historyEntries = await historyServiceMongo.getAllHistoryEntries();
            return res.json({ historyEntries })
        } catch (error) {
            next(error);
        }
    },
    getById: async (req, res, next) => {
        try {
            const { historyId } = req.params;
            const historyEntry = await historyServiceMongo.getHsitoryEntryById(historyId);
            return res.json(historyEntry);
        } catch (error) {
            next(error);
        }
    },
    getBoxHsitoryById: async (req, res, next) => {
        try {
            const { boxId } = req.params;
            const historyEntries = await historyServiceMongo.getAllHistoryEntriesOfABox(boxId);
            return res.json(historyEntries);
        } catch (error) {
            next(error);
        }
    },
    create: async (req, res, next) => {
        try {
            const historyEntry = await historyServiceMongo.createNewHistoryEntry(req.body);
        return res.json({
            message: "History Entry successfully created",
            historyEntry
        });
        } catch (error) {
            next(error);
        }
    },
    deleteById: async (req, res, next) => {
        try {
            const { historyId } = req.params;
            await historyServiceMongo.deleteHistoryEntryById(historyId);
            return res.json({
                message: `successfully deleted history entry with id: ${historyId}`
            })
        } catch (error) {
            next(error);
        }
    },
    updateById: async (req, res, next) => {
        try {
            const { historyId } = req.params;
            const historyEntry = await historyServiceMongo.updateHistoryEntryById(historyId, req.body);
            return res.json({
                message: `successfully updated history entry with id: ${historyId}`,
                historyEntry
            })
        } catch (error) {
            next(error);
        }
    }
}