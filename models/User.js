'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  mail: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  header: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String
  },
  description: {
    type: String
  },
  category: {
    type: String,
    enum: ['acordeon', 'armonica', 'bajo', 'bateria', 'flauta', 'guitarra', 'maracas', 'piano', 'saxofon', 'trompeta', 'violin']
  }
//   level: {
//     type: String,
//     enum: ['beginer', 'nice', 'master']
//   }
})

const User = mongoose.model('User', userSchema)

module.exports = User
