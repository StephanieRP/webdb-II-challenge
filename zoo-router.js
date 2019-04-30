const knex = require('knex')
const express = require('express')
const router = express.Router();
const knexConfig = require('./knexfile.js')
const zooDb = knex(knexConfig)
  
  router.get('/', async (req, res) => {
    try {
        const zoo = await zooDb('zoos')
        res.status(200).json(zoo)
    } catch {
        res.status(500).json({
            message: 'Could not find any animals!'
        })
  }
  });
  
  router.get('/:id', async (req, res) => {
   const { id } = req.params
   try {
       const getID = await zooDb('zoos')
       .where({ id: id })
       .first()
       getID ? res.status(200).json(getID) : res.status(404).json({message: "Could not find an animal with that ID"})
   } catch (error) {
       res.status(500).json({message: 'Something went wrong...'})
   }
  });
  
  router.post('/', async (req, res) => {
      const { body, id }  = req
    try {
        const newZoo = await zooDb('zoos').insert(body)
        .where({ id: body[0] })
        .first()
       res.status(201).json(newZoo)
    } catch {
        res.status(500).json({message: 'Something went wrong...'})
    }
  });
  
  router.put('/:id', async (req, res) => {
    const {body} = req
    const {id} = req.params
    try {
        const zooID = await zooDb('zoos')
        .where({ id: id})
        .update(body)
        res.status(200).json(body)
    } catch (error) {
        res.status(500).json({message: 'Something went wrong...'})
    }
  });
  
  router.delete('/:id', async (req, res) => {
    const {id} = req.params
    try {
        const zooID = await zooDb('zoos')
        .where( {id: id})
        .delete()
        res.status(204).json({message: "Animal safely removed!"})
    } catch (error) {
        res.status(500).json({message: 'Something went wrong...'})
    }
  });

module.exports = router;