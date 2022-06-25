

module.exports = ({ sizeRepository }) => {
    return ({
        createNewSize: (sizeData) => {
            const { name, code, mesurments, weight } = sizeData;
            return sizeRepository.create({ name, code, mesurments, weight });
        },
        getAllSizes: () => {
            return sizeRepository.list();
        },
        getSizeById: async (id) => {
            const size = await sizeRepository.getById(id);
            if(!size) {
                throw new Error(`could not find size with id: ${id}`);
            }
            return size;
        },
        deleteSizeById: (id) => {
            return sizeRepository.deleteById(id);
        },
        updateSizeById: (id, sizeData) => {
            const { name, code, mesurments, weight } = sizeData;
            const sizeDataFields = { name, code, mesurments, weight };
            return sizeRepository.updateSize(id, sizeDataFields);
        }
    })
}