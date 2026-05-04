const express = require('express')
const app = express()

let users = []
let nextId = 1

app.use(express.json())
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', '*')
  res.header('Access-Control-Allow-Headers', '*')
  if (req.method === 'OPTIONS') return res.sendStatus(200)
  next()
})

app.get('/users', (req, res) => res.json(users))

app.post('/users', (req, res) => {
  const user = { id: nextId++, ...req.body }
  users.push(user)
  res.status(201).json(user)
})

app.put('/users/:id', (req, res) => {
  const index = users.findIndex(u => u.id === Number(req.params.id))
  if (index === -1) return res.status(404).json({ message: 'Not found' })
  users[index] = { ...users[index], ...req.body }
  res.json(users[index])
})

app.delete('/users/:id', (req, res) => {
  users = users.filter(u => u.id !== Number(req.params.id))
  res.json({})
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`API corriendo en puerto ${PORT}`))