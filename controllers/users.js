const express = require('express');
const router = express.Router();

const User = require('../models/user.js');

router.get('/', async (req, res) => {
    try{
    const allUsers = await User.find({});
    
      res.render('users/index.ejs', {
        allUsers
      });
    } catch (error) {
      console.log(error);
      res.redirect('/');
    }
    });

    router.get('/:userId', async (req, res) => {
        try{
            const user = await User.findById(req.params.userId);
            res.render('users/show.ejs', { user, foods: user.pantry})
        } catch (error) {
            console.log(error);
            res.redirect('/');
        }
    })


    module.exports = router;