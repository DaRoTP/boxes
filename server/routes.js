const ENV = require("./conf/env.conf");
const express = require("express");
const { graphqlHTTP } = require("express-graphql");

const locationRoutes = require("./rest/routes/location.route");
const activityRoutes = require("./rest/routes/activity.route");
const sizeRoutes = require("./rest/routes/size.route");
const boxRoutes = require("./rest/routes/box.route");
const userRoutes = require("./rest/routes/user.route");

const errorMiddleware = require("./middleware/error.middleware");
const { isAuth } = require("./middleware/isAuth.middleware");

const rootSchema = require("./graphql");

const API_PREFIX = "/api";

module.exports = (app) => {
  app.use(isAuth);

  if (ENV.API_TYPE === "GRAPHQL") {
    // GRAPHQL route
    app.use(
      `${API_PREFIX}/graphql`,
      graphqlHTTP((req) => {
        return {
          schema: rootSchema,
          graphiql: true,
          context: { isAuth: req.isAuth }
        };
      })
    );
    if (ENV.NODE_ENV === "production") {
      app.use(express.static(__dirname + "/public/"));
      app.post("*", (_, res) => res.sendFile(__dirname + "/public/index.html"));
    }
  } else {
    // REST routes
    app
      .use(`${API_PREFIX}/location`, locationRoutes)
      .use(`${API_PREFIX}/activity`, activityRoutes)
      .use(`${API_PREFIX}/size`, sizeRoutes)
      .use(`${API_PREFIX}/box`, boxRoutes)
      .use(`${API_PREFIX}/user`, userRoutes)
      .use(errorMiddleware);

    if (ENV.NODE_ENV === "production") {
      app.use(express.static(__dirname + "/public/"));
      app.get("*", (_, res) => res.sendFile(__dirname + "/public/index.html"));
    }
  }

  app.use((req, res) => {
    res.status(404).json({
      message: `[BAD REQUEST] - route ${req.originalUrl} does not exist with METHOD: ${req.method}`,
    });
  });
};
