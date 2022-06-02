const app = require('./src/index');
const serverless = require("serverless-http");

module.exports.handler = serverless(app);
