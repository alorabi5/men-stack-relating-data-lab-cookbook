// controllers/foods.js

const express = require('express');
const router = express.Router();

const User = require('../models/user.js');

// router logic will go here - will be built later on in the lab
router.get('/', async (req, res) => {
  try{
  const currentUser = await User.findById(req.session.user._id)
    res.render('foods/index.ejs', {
      pantryEl: currentUser.pantry
    })
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
  });

  router.get('/new', async (req, res) => {
    res.render('foods/new.ejs', {user: req.session.user})
  });

  router.post('/', async (req, res) => {
    try {
      const currentUser = await User.findById(req.session.user._id)
      req.body.date = new Date(req.body.date)
      currentUser.pantry.push(req.body)
      await currentUser.save()
      res.redirect(`/users/${currentUser._id}/foods`)
    } catch (error) {
      console.log(error)
      res.redirect('/')
    }
  })

  router.get('/:itemId', async (req, res) => {
    try {
      const currentUser = await User.findById(req.session.user._id)
      console.log(req.params.itemId)
      const foods = currentUser.pantry.id(req.params.itemId)
      console.log(foods)
      res.render('foods/show.ejs', {
        foods
      })
    } catch (error) {
      console.log(error)
      res.redirect('/')
    }
  })

  router.delete('/:itemId', async (req, res) => {
    try {
      const currentUser = await User.findById(req.session.user._id)
      currentUser.pantry.id(req.params.itemId).deleteOne()
      await currentUser.save()
      res.redirect(`/users/${currentUser._id}/foods`)
    } catch (error) {
      console.log(error)
      res.redirect('/')
    }
  })

  router.get('/:itemId/edit', async (req, res) => {
    try {
      const currentUser = await User.findById(req.session.user._id)
      const food = currentUser.pantry.id(req.params.itemId)
      res.render('foods/edit.ejs', {
        food,
      })
    } catch (error) {
      console.log(error)
      res.redirect('/')
    }
  })

  router.put('/:itemId', async (req, res) => {
    try {
      const currentUser = await User.findById(req.session.user._id);
      const food = currentUser.pantry.id(req.params.itemId);
      
      food.set(req.body);
      await currentUser.save();
      
      res.redirect(`/users/${currentUser._id}/foods/${req.params.itemId}`);
    } catch (error) {
      console.log(error);
      res.redirect('/');
    }
  });


module.exports = router;