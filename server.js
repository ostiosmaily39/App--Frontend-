const express = require('express')
const cors = require('cors')
const fs = require('fs')
const app = express()

const DB = './db.json'
let users = fs.existsSync(DB) ? JSON.parse(fs.readFileSync(DB)) : []
let nextId = users.length ? Math.max(...users.map(u => u.id)) + 1 : 1
const save = () => fs.writeFileSync(DB, JSON.stringify(users))

app.use(cors())
app.use(express.json())

app.get('/users', (req, res) => res.json(users))

app.post('/users', (req, res) => {
  const user = { id: nextId++, ...req.body }
  users.push(user)
  save()
  res.status(201).json(user)
})

app.put('/users/:id', (req, res) => {
  const index = users.findIndex(u => u.id === Number(req.params.id))
  if (index === -1) return res.status(404).json({ message: 'Not found' })
  users[index] = { ...users[index], ...req.body }
  save()
  res.json(users[index])
})

app.delete('/users/:id', (req, res) => {
  users = users.filter(u => u.id !== Number(req.params.id))
  save()
  res.json({})
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`API corriendo en puerto ${PORT}`))