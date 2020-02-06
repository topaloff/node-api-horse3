const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const checkAuth = require('../middleware/checkAuth');
const Horse = require('../models/Horse');

// GET all horses
router.get('/', (req,res,next) => {
    Horse.find((err, horses) => {
        if(err){
            return next(err);
        }
        res.json(horses);
    })
})

//GET SINGLE HORSE
router.get('/:id', (req, res, next) =>{
    const id = req.params.id;
    Horse.findById(id, (err, horse) => {
        if(err) return next(err)
        res.json(horse);
    })
})

//GET PRIZE OF HORSE
router.get('/prize/:id', (req, res, next) =>{
    const id = req.params.id;
    Horse.findById(id, (err, horse) => {
        if(err) return next(err)
        res.json(horse.prize);
    })
})

//GET FULL DETAIL OF HORSE WITH OWNER
router.get('/full/:id', (req, res, next) =>{
    const id = req.params.id;
    Horse.findById(id, (err, horse) => {
        if(err) return next(err)
        Owner.findById(horse.owner, (err, owner) => {
            if(err) return next(err)
            horse.owner = owner;
            res.json(horse);
        })
    })
})


//ADD HORSE
router.post('/add', checkAuth, (req, res, next)=>{
    Horse.find({certificat: req.body.certificat})
    .then(data => {
        if(data.length !== 0){
            res.status(409).json({message: 'Le cheval existe deja'} );
            res.end();
        }
    })
    .catch(err => res.json(err))

    const newHorse = req.body;
    Horse.create(newHorse, (err, horse) => {
        if(err) return next(err)
        res.json(horse)
    })
})

//DELETE HORSE
router.delete('/delete/:id',checkAuth, (req, res, next) =>{
    const id = req.params.id;
    Horse.findByIdAndDelete(id,(err,horse)=>{
        if(err) return next(err)
        res.json(horse);
    })
})

// //UPDATE HORSE
router.put('/:id', checkAuth, (req, res, next) => {
    const id = req.params.id;
    const updatedHorse = req.body;
    Horse.findByIdAndUpdate(id, updatedHorse, (err, horse) => {
        if(err) return next(err)
        res.json(horse);
    })
})

module.exports = router;
