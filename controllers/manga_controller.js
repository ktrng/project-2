const express = require('express')
const Manga = require('../models/product.js')
const mangaSeed = require('../models/mangaSeed.js')
const manga = express.Router()

///////////////////////////////////
///// ROUTES
///////////////////////////////////

////////////////
// EDIT
////////////////
manga.get('/:id/edit', (req, res) => {
  Manga.findById(req.params.id, (error, editManga) => {
    res.render(
      'readr/edit.ejs',
      {
        manga: editManga
      }
    )
  })
})

module.exports = manga
