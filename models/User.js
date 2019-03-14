'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const userSchema = new Schema({
  name: {
    type: String
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
    type: String
  },
  imageUrl: {
    type: String,
    default: '/images/default-portada.png'
  },
  imageProfile: {
    type: String,
    default: '/images/perfilDefecto.png'
  },
  description: {
    type: String
  },
  category: {
    type: String,
    enum: ['acordeon', 'armonica', 'bajo', 'bateria', 'flauta', 'guitarra', 'maracas', 'piano', 'saxofon', 'trompeta', 'violin']
  },
  location: {
    type: {
      type: String,
      default: 'Point'
    },
    coordinates: [Number]
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User
