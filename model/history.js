const express = require('express')
const mongoose  = require('mongoose')

const HistorySchema = new mongoose.Schema({
    icon:String,
    name:String,
    country:String,
    main:String,
    description:String,
    temp:Number,
    pressure:Number,
    humidity:String
})

const History = mongoose.model('History',HistorySchema)
module.exports = History