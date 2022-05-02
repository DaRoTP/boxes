const connection = require("../conf/mongoose.conf")

module.exports = (modelName, schema) => {
  return connection.model(modelName, schema);
};