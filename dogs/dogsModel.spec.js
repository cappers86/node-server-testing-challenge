const db = require('../data/dbConfig')
const Dogs = require('./dogsModel')
const server = require('../api/server');
const request = require('supertest');

beforeEach(async () => {
    await db('dogs').truncate()
  })
  

  describe('Dogs post', () => {
      it('inserts a dog', async () => {
        await request(server)
        .post('/dogs')
        .send({
          name: 'George'
      })
      const dogs = await db('dogs')
      expect(dogs).toHaveLength(1)
    })
  
      it('inserts the dogs without breaking them', async () => {
        const dog = await Dogs.insert({ name: 'jasper' })
        expect(dog).toMatchObject({ name: 'jasper' })
      })
  
      it('can find a dog in the db', async () => {
        // first we need a hobbit actually there
        // remember the db gets truncated after each test
        // don't entangle yourself with other model functions
        await db('dogs').insert({ name: 'jasper' })
        const jasper = await Dogs.findById(1)
        expect(jasper).toMatchObject({ name: 'jasper' })
      })
    })
  
  