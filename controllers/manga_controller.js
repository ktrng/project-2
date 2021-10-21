const express = require('express')
const Manga = require('../models/manga.js')
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


////////////////
// UPDATE
////////////////
manga.put('/:id', (req, res) => {
  Manga.findByIdAndUpdate(req.params.id, req.body, {new: true}, (error, updatedManga) => {
    res.redirect('/readr')
  })
})

////////////////
// NEW
////////////////
manga.get('/new', (req, res) => {
  res.render(
    'readr/new.ejs'
  )
})

////////////////
// CREATE
////////////////
manga.post('/', (req, res) => {
  Manga.create(req.body, (error, addedManga) => {
    res.redirect('/readr')
  })
})

////////////////
// INDEX
////////////////
manga.get('/', (req, res) => {
  Manga.find({}, (error, allManga) => {
    res.render(
      'readr/index.ejs',
      {
        mangas: allManga,
        id: req.params.id,
      }
    )
  })
})

////////////////
// SEED
////////////////
manga.get('/seed', () => {
  Manga.create(mangaSeed, (error, seeds) => {
    res.redirect('/')
  })
})

///////////////////////////////////
///// EXPORT
///////////////////////////////////
module.exports = manga
