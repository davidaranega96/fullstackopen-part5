if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
  
const PORT = process.env.PORT

const DB_URL = process.env.NODE_ENV === 'production' 
  ? process.env.DB_URL
  : process.env.TEST_DB_URL

module.exports = {
  DB_URL,
  PORT
}