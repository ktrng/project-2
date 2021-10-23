const express = require('express')
const Manga = require('../models/manga.js')
const mangaSeed = require('../models/mangaSeed.js')
const manga = express.Router()
const Comment = require('../models/comment.js')

///////////////////////////////////
///// ROUTES
///////////////////////////////////

/////////////////////////
// CREATE - COMMENT
/////////////////////////
manga.post('/:id', (req, res) => {
  Comment.create(req.body, (error, addedComment) => {
    res.redirect('/readr/:id')
  })
})

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
// DELETE
////////////////
manga.delete('/:id', (req, res) => {
  Manga.findByIdAndRemove(req.params.id, (error, data) => {
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

////////////////
// SHOW
////////////////
manga.get('/:id', (req, res) => {
  Manga.findById(req.params.id, (error, thisManga) => {
    res.render(
      'readr/show.ejs',
      {
        manga: thisManga,
        id: req.params.id
      }
    )
  })
})

///////////////////////////////////
///// EXPORT
///////////////////////////////////
module.exports = manga
