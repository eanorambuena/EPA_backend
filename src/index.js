const app = require('./app')
const db = require('./models')
const dotenv = require('dotenv')
const { Server } = require('socket.io')
const { createServer } = require('node:http')

dotenv.config()

const PORT = process.env.PORT || 3000

const server = createServer(app.callback())
const options = {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST']
  },
  connectionStateRecovery: {}
}
const io = new Server(server, options)

io.on('connection', (socket) => {
  socket.on('disconnect', () => {
    console.log('user disconnected')
  })

  socket.on('add_message', async (msg) => {
    console.log('message: ' + JSON.stringify(msg))
    io.emit('new_message', msg)
  })
})

db.sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.')
    server.listen(PORT)
    console.log(`Server running on http://localhost:${PORT}`)
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err)
  })
