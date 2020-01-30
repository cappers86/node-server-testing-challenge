const server = require('./server')
const request = require('supertest')

describe('server.js module', () => {
  it('has the right environment for DB_ENV', () => {
    expect(process.env.DB_ENV).toBe('testing')
  })

  describe('api works  endpoint', () => {

    it('returns a 200 OK async/await', async () => {
      const res = await request(server).get('/')
      expect(res.status).toBe(200)
    })

    it('returns a 200 OK ES6 promises', () => {
      return request(server).get('/')
        .then(res => {
          // run all the jest matchers you want
          expect(res.status).toBe(200)
          // expect(res.body).toMatchObject({ api: 'up' })
        })
    })

    it('returns a 200 OK supertest', () => {
      return request(server).get('/')
        .expect(200)
    })

    it('returns the right body', () => {
      return request(server).get('/')
        .expect({ message: 'api works' })
    })

    it('returns the right headers', () => {
      // multi-assertion test
      return request(server).get('/')
        .expect('Content-Length', '23')
        .expect('Content-Type', /json/)
    })
  })
})