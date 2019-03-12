'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const matchSchema = new Schema({
  teacher: {
    type: ObjectId,
    ref: 'User'
  },
  student: {
    type: ObjectId,
    ref: 'User'
  }
})

const Match = mongoose.model('matchSchema', matchSchema)

module.exports = Match
