const request = require('supertest')
const Auth = require('./Auth/auth-model')
const db = require('./data/db-config')
const server = require('./server')



beforeAll(async () => {
  await db.migrate.rollback()
  await db.migrate.latest()
})
beforeEach(async () => {
  // await db('image').truncate()
  // await db('users').truncate()
})
afterAll(async () => {
  await db.destroy()
})

describe('users sanity check', () => {
  test('sanity check', () => {
    expect(Auth).toBeDefined()
  })
  test('testing enviromnet', () => {
    expect(process.env.NODE_ENV).toBe('testing')
  })

  describe('register', () => {
    it('able to insert a new user', async () => {
      await request(server).post('/api/auth/register').send({username: 'sammmmmm', password: "1234", email:"karel@mama.com"})
      expect(await Auth.getAll()).toHaveLength(1)
    })
    it('have the correct id', async () => {
      const result = await request(server).post('/api/auth/register').send({username: 'sam', password: "1234",email:"karel@mama.com"})
      expect(result.body.token)
    })
  })
})

