import { expect } from 'chai'
import { env } from './env'
import { app } from './server'

let origin = `http://localhost:${env.PORT}`

async function get(url: string) {
  let res = await fetch(`${origin}${url}`)
  let json = await res.json()
  return { res, json }
}

before(async () => {
  return new Promise((resolve, reject) => {
    app.listen(env.PORT, resolve).on('error', reject)
  })
})

describe('GET /users', () => {
  it('should return a list of users', async () => {
    let { json } = await get('/users')
    expect(json).to.deep.equal({
      users: [
        { id: 1, name: 'John' },
        { id: 2, name: 'Jane' },
      ],
    })
  })
})

describe('GET /users/:id', () => {
  it('should return a user by id', async () => {
    let { json } = await get('/users/1')
    expect(json).to.deep.equal({ user: { id: 1, name: 'John' } })
  })
})
