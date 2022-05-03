const ENV = require('./conf/env.conf');

const { graphqlHTTP } = require("express-graphql");

const locationRoutes = require("./rest/routes/location.route");
const activityRoutes = require("./rest/routes/activity.route");
const boxRoutes = require("./rest/routes/box.route");
const errorMiddleware = require('./middleware/error.middleware');


const rootSchema = require("./graphql");

const API_PREFIX = "/api";

module.exports = (app) => {

  if(ENV.API_TYPE === "GRAPHQL") {
    // GRAPHQL route
    app
    .use(`${API_PREFIX}/graphql`, graphqlHTTP({
      schema: rootSchema,
      graphiql: true
    }))
  } else {
    // REST routes
    app
    .use(`${API_PREFIX}/location`, locationRoutes)
    .use(`${API_PREFIX}/activity`, activityRoutes)
    .use(`${API_PREFIX}/box`, boxRoutes)
    .use(errorMiddleware);
  }

  app.use((req, res) => {
    res.status(404).json({
      message: `[BAD REQUEST] - route ${req.originalUrl} does not exist with METHOD: ${req.method}`,
    });
  })

};