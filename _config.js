var config = {};

// Update to have your correct username and password
config.mongoURI = {
  production: process.env.DB_URI,
  development: process.env.DB_URI,
  test: process.env.DB_URI,
};
module.exports = config;
