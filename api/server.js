const express = require('express');

const Dogs = require('../dogs/dogsModel');

const server= express();
server.use(express.json());

server.get('/', (req, res) => {
    res.status(200).json({message: 'api works'});
});

server.get("/dogs", (req, res) => {
    Dogs.getAll()
      .then(dogs => {
        res.status(200).json(dogs);
      })
      .catch(error => {
        res.status(500).json(error);
      });
  });
  server.post('/dogs', (req, res) => {
    Dogs.insert(req.body)
     .then(result => {
      res.status(201).json(result)
    })
    .catch(error => {
      res.status(500).json(error)
    });
  });

  // server.delete('/dogs/:id', (req, res) => {
  //   const { id } = req.params;
  //   Dogs.remove(id)
  //       .then(del => {
  //           if (del) {
  //               res.status(200).json({ message: 'completed'})
  //           } else {
  //               res.status(404).json({message: 'Could not find ID'})
  //           }
  //       })
  //       .catch(error => {
  //           res.status(500).json({ message: 'Failed', error})
  //       })
  server.delete('/dogs/:id/', async (req, res) => {
    const { id } = req.params
  
    try {
      const dog = await Dogs.findById(id)
  
      if(dog) {
        const dog = await Dogs.remove(id)
        res.status(200).json({message: 'success'})
      } else {
        res.status(404).json({ message: 'Id doesnt exist' })
      }
    } catch(err) {
      res.status(500).json({ message: 'Failed'})
    }
  })

  
 
module.exports = server;
