const mongoose = require('mongoose')
const express = require('express')
const History = require('./model/history')
const router = express.Router()

//getting data from the database
router.get('/',async (req,res)=>{
    try {
        const history = await History.find()
        res.json(history)
    } catch (error) {
        res.json({message:'error occured duriing getting data time'})
    }
})



//posting data into database
router.post('/',async (req,res)=>{
    const history = new History(req.body)
    try {
        const savedHistory = await history.save()
        res.json(savedHistory)
    } catch (error) {
        res.json({message:'error occured during data posting time'})
    }
})




module.exports = router