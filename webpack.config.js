const dev = require("./webpack.config.dev");
const prod = require("./webpack.config.prod");
const env = process.env.NODE_ENV;
if (env == "development") {
    module.exports = dev;
}
if (env == "production") {
    module.exports = prod;
}