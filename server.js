const jsonServer = require('json-server')
const fs = require('fs')
const path = require('path')

const dbPath = path.join(__dirname, 'db.json')
fs.writeFileSync(dbPath, '{"users":[]}', 'utf8')

const server = jsonServer.create()
const middlewares = jsonServer.defaults()

server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', '*')
  res.header('Access-Control-Allow-Headers', '*')
  next()
})

server.use(middlewares)

const PORT = process.env.PORT || 3001
server.listen(PORT, () => {
  console.log(`JSON Server corriendo en puerto ${PORT}`)
  // Inicializar el router DESPUÉS de que el servidor esté corriendo
  const router = jsonServer.router(dbPath)
  server.use(router)
})