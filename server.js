const jsonServer = require('json-server')
const fs = require('fs')
const path = require('path')

const dbPath = path.join(__dirname, 'db.json')

// Si el archivo no existe o está corrupto, lo recreamos
try {
  const content = fs.readFileSync(dbPath, 'utf8').trim().replace(/^\uFEFF/, '')
  JSON.parse(content)
} catch (e) {
  fs.writeFileSync(dbPath, '{"users":[]}', 'utf8')
}

const server = jsonServer.create()
const router = jsonServer.router(dbPath)
const middlewares = jsonServer.defaults()

server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', '*')
  res.header('Access-Control-Allow-Headers', '*')
  next()
})

server.use(middlewares)
server.use(router)

const PORT = process.env.PORT || 3001
server.listen(PORT, () => {
  console.log(`JSON Server corriendo en puerto ${PORT}`)
})