const express = require('express')
const Manga = require('../models/manga.js')
const mangaSeed = require('../models/mangaSeed.js')
const manga = express.Router()
const Comment = require('../models/comment.js')

///////////////////////////////////
///// ROUTES
///////////////////////////////////

/////////////////////////
// AUTHENTICATOR
/////////////////////////
const loggedIn = (req, res, next) => {
  if (req.session.currentUser) {
    return next()
  } else {
    res.redirect('/sessions/new')
  }
}

/////////////////////////
// CREATE - COMMENT (props to Steven in the TA office hours channel for pointing me in the right direction; https://kb.objectrocket.com/mongo-db/how-to-do-a-one-to-many-join-using-mongoose-229)
/////////////////////////
manga.post('/:id', (req, res) => {
  Comment.create(req.body, (error, newComment) => {
    console.log(newComment);
    Manga.findOneAndUpdate({id: req.params.id}, {$push: {comments: newComment}}, {new: true}, (error, updatedManga) => {
      res.redirect(
        `/readr/${req.params.id}`
      )
    })
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
        manga: editManga,
        currentUser: req.session.currentUser
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
manga.delete('/:id', loggedIn, (req, res) => {
  Manga.findByIdAndRemove(req.params.id, (error, data) => {
    res.redirect('/readr')
  })
})

////////////////
// NEW
////////////////
manga.get('/new', loggedIn, (req, res) => {
  res.render(
    'readr/new.ejs',
    {
      currentUser: req.session.currentUser
    }
  )
})

////////////////
// CREATE
////////////////
manga.post('/', loggedIn, (req, res) => {
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
        currentUser: req.session.currentUser
      }
    )
  })
})

////////////////
// SEED
////////////////
manga.get('/seed', (req, res) => {
  Manga.create(mangaSeed, (error, seeds) => {
    res.redirect('/')
  })
})

////////////////
// SHOW
////////////////
manga.get('/:id', (req, res) => {
  Manga.findById(req.params.id, (error, thisManga) => {
    Comment.find({}, (error, comments) => {
      res.render(
        'readr/show.ejs',
        {
          manga: thisManga,
          id: req.params.id,
          currentUser: req.session.currentUser,
          comments: comments
        }
      )
    })
  })
})

///////////////////////////////////
///// EXPORT
///////////////////////////////////
module.exports = manga
