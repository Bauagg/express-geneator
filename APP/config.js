const dotenv = require('dotenv')
const path = require('path')

dotenv.config();

module.exports = {
    rootPath: path.resolve(__dirname, '..'),
    secretkey: process.env.SECRET_KEY,
    servicename: process.env.SECRET_NAME,
    dbHost: process.env.DB_HOST,
    dbPort: process.env.DB_PORT,
    dbName: process.env.DB_NAME
}