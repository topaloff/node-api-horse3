const mongoose = require('mongoose');
const Owner = require('../models/Owner');

// GET all owners
exports.owner_list = (req,res,next) => {
    Owner.find((err, owners) => {
        if(err){
            return next(err);
        }
        res.json(owners);
    })
}

//GET SINGLE OWNER
exports.owner_detail = (req, res, next) =>{
    const id = req.params.id;
    Owner.findById(id, (err, owner) => {
        if(err) return next(err)
        res.json(owner);
    })
}

//ADD OWNER
exports.owner_add = (req, res, next)=>{
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
}

//DELETE OWNER
exports.owner_delete = (req, res, next) =>{
    const id = req.params.id;
    Owner.findByIdAndDelete(id,(err,owner)=>{
        if(err) return next(err)
        res.json(owner);
    })
}

//UPDATE OWNER
exports.owner_update = (req, res, next) => {
    const id = req.params.id;
    const updatedOwner = req.body;
    Owner.findByIdAndUpdate(id, updatedOwner, (err, owner) => {
        if(err) return next(err)
        res.json(owner);
    })
}