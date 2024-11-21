import express, { Application } from 'express'
import { print } from 'listening-on'
import { env } from './env'

export let app: Application = express()

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

let users = [
  { id: 1, name: 'John' },
  { id: 2, name: 'Jane' },
]

app.get('/users', (req, res) => {
  res.json({ users })
})

app.get('/users/:id', (req, res) => {
  let user = users.find(user => user.id === Number(req.params.id))
  if (!user) {
    res.status(404).json({ error: 'User not found' })
  } else {
    res.json({ user })
  }
})

if (process.argv[1] === __filename) {
  app.listen(env.PORT, () => {
    print(env.PORT)
  })
}
