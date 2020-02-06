const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const checkAuth = require('../middleware/checkAuth');
const Owner = require('../models/Owner');

// GET all owners
router.get('/', (req,res,next) => {
    Owner.find((err, owners) => {
        if(err){
            return next(err);
        }
        res.json(owners);
    })
})

//GET SINGLE OWNER
router.get('/:id', (req, res, next) =>{
    const id = req.params.id;
    Owner.findById(id, (err, owner) => {
        if(err) return next(err)
        res.json(owner);
    })
})

//ADD OWNER
router.post('/add', checkAuth, (req, res, next)=>{
    Owner.find({email: req.body.email})
    .then(data => {
        if(data.length !== 0){
            res.status(409).json({message: 'Le owner existe deja'} );
            res.end();
        }
    })
    .catch(err => res.json(err))

    const newOwner = req.body;
    Owner.create(newOwner, (err, owner) => {
        if(err) return next(err)
        res.json(owner)
    })
})

//DELETE OWNER
router.delete('/delete/:id',checkAuth, (req, res, next) =>{
    const id = req.params.id;
    Owner.findByIdAndDelete(id,(err,owner)=>{
        if(err) return next(err)
        res.json(owner);
    })
})

// //UPDATE OWNER
router.put('/:id', checkAuth, (req, res, next) => {
    const id = req.params.id;
    const updatedOwner = req.body;
    Owner.findByIdAndUpdate(id, updatedOwner, (err, owner) => {
        if(err) return next(err)
        res.json(owner);
    })
})

module.exports = router;