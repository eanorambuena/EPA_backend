const app = require('./app')
const db = require('./models')
const dotenv = require('dotenv')

dotenv.config()

const PORT = process.env.PORT || 3000

const httpServer = require('http').createServer(app.callback())
const options = {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST']
  }
}
const io = require('socket.io')(httpServer, options)

io.on('connection', (socket) => {
  socket.on('disconnect', () => {
    console.log('user disconnected')
  })

  socket.on('add_message', (msg) => {
    console.log('message: ' + JSON.stringify(msg))
    io.emit('add_message', msg)
  })
})

db.sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.')
    httpServer.listen(PORT)
    console.log(`Server running on http://localhost:${PORT}`)
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err)
  })
