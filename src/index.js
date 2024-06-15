const app = require('./app')
const db = require('./models')
const dotenv = require('dotenv')

dotenv.config()

const PORT = process.env.PORT || 3000

db.sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.')
    app.listen(PORT, (err) => {
      if (err) {
        console.error('Error starting server:', err)
        return
      }
      console.log(`Server running on http://localhost:${PORT}`)
      return app
    })
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err)
  })
