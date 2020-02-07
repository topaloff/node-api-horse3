const mongoose = require('mongoose');
const Horse = require('../models/Horse');
const Owner = require('../models/Owner');

// GET all horses
exports.horse_list = (req,res,next)=>{
    Horse.find((err, horses) => {
        if(err){
            return next(err);
        }
        res.json(horses);
    })
}

//GET SINGLE HORSE
exports.horse_detail = (req, res, next) =>{
    const id = req.params.id;
    Horse.findById(id, (err, horse) => {
        if(err) return next(err)
        res.json(horse);
    })
}

//GET PRIZE OF HORSE
exports.horse_prize = (req, res, next) =>{
    const id = req.params.id;
    Horse.findById(id, (err, horse) => {
        if(err) return next(err)
        res.json(horse.prize);
    })
}

//GET FULL DETAIL OF HORSE WITH OWNER
exports.horse_full = (req, res, next) =>{
    const id = req.params.id;
    Horse.findById(id, (err, horse) => {
        if(err) return next(err)
        Owner.findById(horse.owner, (err, owner) => {
            if(err) return next(err)
            horse.owner = owner;
            res.json(horse);
        })
    })
}

//ADD HORSE
exports.horse_add = (req, res, next)=> {
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
}

//DELETE HORSE
exports.horse_delete = (req, res, next) =>{
    const id = req.params.id;
    Horse.findByIdAndDelete(id,(err,horse)=>{
        if(err) return next(err)
        res.json(horse);
    })
}

// //UPDATE HORSE
exports.horse_update = (req, res, next) => {
    const id = req.params.id;
    const updatedHorse = req.body;
    Horse.findByIdAndUpdate(id, updatedHorse, (err, horse) => {
        if(err) return next(err)
        res.json(horse);
    })
}

//ADD PRIZE.
exports.horse_add_prize = (req,res,next) => {
    const id = req.params.id;
    const newPrize = req.body;
    Horse.findByIdAndUpdate(id, {$push:{"prize":newPrize}}, (err, horse) => {
       if(err) return next(err)
       res.json({message:"Prix bien ajoute"});
   })
}