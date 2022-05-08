module.exports = (data, page, perPage) => {
    const totalItems = data.length;
    const paginatedData = data.slice(page * perPage, page * perPage + perPage)
    const totalPages = Math.ceil(totalItems / perPage);

    return { totalItems, totalPages, data: paginatedData };
}