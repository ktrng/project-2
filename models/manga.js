const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Comment = require('./comment.js')


const mangaSchema = new Schema(
  {
    title: {type: String, required: true},
    description: {type: String, required: true},
    img: String,
    infoLink: String,
    buyLink: String,
    comments: [Comment.schema]
  }
)


const Manga = mongoose.model('Manga', mangaSchema)

module.exports = Manga
