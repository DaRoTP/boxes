const mongoose = require("mongoose");
const ENV = require("./env.conf");

(async () => {
  try {
    await mongoose.connect(ENV.DBURI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();

module.exports = mongoose;