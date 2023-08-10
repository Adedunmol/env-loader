const path = require("path");
const envLoader = require("./main");

const envPath = path.join(__dirname, '../.env_test')

envLoader.config(envPath);

console.log(process.env.TEST)