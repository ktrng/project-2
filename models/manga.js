const mongoose = require('mongoose')
const Schema = mongoose.Schema

const mangaSchema = new Schema(
  {
    title: {type: String, required: true},
    description: {type: String, required: true},
    img: String,
    infoLink: String,
    buyLlink: String,
  }
)

const Manga = mongoose.model('Manga', mangaSchema)

module.exports = Manga
