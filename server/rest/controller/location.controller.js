const locationRepository = require("../../repository/location.repository");
const locationService = require("../../service/location.service");
const paginate = require("../../utils/paginate");

const locationServiceMongo = locationService({ locationRepository });

module.exports = {
  list: async (req, res, next) => {
    try {
      const { page, perPage, query } = req.query;
      let locations = await locationServiceMongo.getAllLocations({ query });

      if (page !== undefined && perPage !== undefined) {
        const { totalItems, totalPages, data } = paginate(locations, page, perPage);
        return res.json({ locations: data, totalItems, totalPages  });
      }
      return res.json({ locations });
    } catch (error) {
      next(error);
    }
  },
  getById: async (req, res, next) => {
    try {
      const { locationId } = req.params;
      const location = await locationServiceMongo.getLocationById(locationId);
      return res.json(location);
    } catch (error) {
      next(error);
    }
  },
  getContactInfo: async (req, res, next) => {
    try {
      const { locationId } = req.params;
      const contactInfo = await locationServiceMongo.getLocationContactInfo(locationId);
      return res.json(contactInfo);
    } catch (error) {
      next(error);
    }
  },
  create: async (req, res, next) => {
    try {
      const location = await locationServiceMongo.createNewLocation(req.body);

      return res.json({
        message: "Location successfully created",
        location,
      });
    } catch (error) {
      next(error);
    }
  },
  deleteById: async (req, res, next) => {
    try {
      const { locationId } = req.params;
      await locationServiceMongo.deleteLocationById(locationId);
      return res.json({
        message: `successfully deleted location with id: ${locationId}`,
      });
    } catch (error) {
      next(error);
    }
  },
  updateById: async (req, res, next) => {
    try {
      const { locationId } = req.params;
      const location = await locationServiceMongo.updateLocationById(locationId, req.body);
      return res.json({
        message: `successfully updated location with id: ${locationId}`,
        location,
      });
    } catch (error) {
      next(error);
    }
  },
};
