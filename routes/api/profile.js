const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Load Input Validation
const validateProfileInput = require('../../validation/profile'); 
const validateArticleInput = require('../../validation/article'); 

// Load Profile Model
const Profile = require('../../models/Profile');
// Load User Profile
const User = require('../../models/User');

// @route  GET api/profiles/tests
// @desc   Tests profiles route
// @access Public
router.get('/test', (req, res) => res.json({msg: "Profiles Works"}));

// @route  GET api/profile
// @desc   Get current users profiles
// @access Private
router.get(
    '/',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
       const errors = {};
 
       Profile.findOne({ user: req.user.id })
          .populate('user', ['name'])
          .then(profile => {
             if (!profile) {
                errors.noprofile = 'There is no profile for this user';
                return res.status(404).json(errors);
             }
             res.json(profile);
          })
          .catch(err => res.status(404).json(err));
    });

// @route  POST api/profile
// @desc   Create user profile
// @access Private
router.post(
    '/', 
    passport.authenticate('jwt', { session: false }), 
    (req, res) => {
        const { errors, isValid } = validateProfileInput(req.body);

    // Check Validation
    if(!isValid) {
        // Return any errors with 400 status
        return res.status(400).json(errors);
    }
    
    // Get fields
    const profileFields = {};
    profileFields.user = req.user.id;
    if(req.body.handle) profileFields.handle = req.body.handle;
    if(req.body.school) profileFields.school = req.body.school;
    if(req.body.status) profileFields.status = req.body.status;
    if(req.body.location) profileFields.location = req.body.location;
    // Skills - Split into array
    if(typeof req.body.skills !== 'undefined') {
        profileFields.skills = req.body.skills.split(',');
    }

     Profile.findOne({ user: req.user.id })
     .then(profile => {
         if(profile) {
            // Update
            Profile.findOneAndUpdate(
                { user: req.user.id }, 
                { $set: profileFields }, 
                { new: true })
            .then(profile => res.json(profile));
         } else {
             // Create

             // Check if handle exists
             Profile.findOne({ handle: profileFields.handle })
             .then(profile => {
                 if(profile) {
                     errors.handle = 'That handle already exsists';
                     res.status(400).json(errors);
                 }

                 // Save Profile
                 new Profile(profileFields).save()
                    .then(profile => res.json(profile));
             });
         }
        });
});

// @route  GET api/profile/user/:user_id
// @desc   Get profile by user ID
// @access Public
router.get('/user/:user_id', (req, res) => {
    const errors = {};

    Profile.findOne({ user: req.params.user_id })
    .populate('user', ['name'])
    .then(profile => {
        if(!profile) {
            errors.noprofile = 'There is no profile for this user';
            return res.status(404).json(errors);
        }

        res.json(profile);
    })
    .catch(err => res.status(404).json({ profile: 'There is no profile for this user' }));
});

// @route  GET api/profile/:handle
// @desc   Get profile by handle
// @access Public
router.get('/handle/:handle', (req, res) => {
    const errors = {};
 
    Profile.findOne({ handle: req.params.handle })
       .populate('user', ['name'])
       .then(profile => {
          if (!profile) {
             errors.noprofile = 'There is no profile for this user';
             res.status(404).json(errors);
          }
 
          res.json(profile);
       })
       .catch(err => res.status(404).json(err));
 });

// @route  GET api/profile/all
// @desc   Get all profiles
// @access Public
router.get('/all', (req, res) => {
    const errors = {};

    Profile
    .find()
    .populate('user', ['name'])
    .then(profiles => {
        if(!profiles) {
            errors.noprofile = 'There are no profiles';
            return res.status(404).json(errors);
        }

        res.json(profiles);
    })
    .catch(err => res.status(404).json({ profile: 'There are no profiles' }));
});

// @route  POST api/profile/article
// @desc   Add article to profile
// @access Private
router.post('/article', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid } = validateArticleInput(req.body);

    // Check Validation
    if(!isValid) {
        // Return any errors with 400 status
        return res.status(400).json(errors);
    }

    Profile.findOne({ user: req.user.id })
    .then(profile => {
        const newArt = {
            title: req.body.title,
            description: req.body.description
        }

        // Add to article array
        profile.article.unshift(newArt);

        profile.save().then(profile => res.json(profile));
    });
});

// @route  DELETE api/profile/article/art_id
// @desc   Delete article from profile
// @access Private
router.delete('/article/:art_id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Profile.findOne({ user: req.user.id })
    .then(profile => {
        // Get remove index
        const removeIndex = profile.article
        .map(item => item.id)
        .indexOf(req.params.art_id);

        // Splice out of array
        profile.article.splice(removeIndex, 1);

        // Save
        profile.save().then(profile => res.json(profile));
    })
    .catch(err => res.status(404).json(err));
});

// @route  POST api/profile/article/art_id
// @desc   Increase article's number
// @access Public
router.post('/article/:handle/:art_id', (req, res) => {
    Profile.findOne({ handle: req.params.handle })
    .populate('user', ['name'])
    .then(profile => {
        const removeIndex = profile.article
        .map(item => item.id)
        .indexOf(req.params.art_id);

        const newArt = {
            title: profile.article[removeIndex].title,
            description: profile.article[removeIndex].description,
            date: profile.article[removeIndex].date,
            like: profile.article[removeIndex].like + 1,
            hate: profile.article[removeIndex].hate
        }
        
        // Splice out of array
        profile.article.splice(removeIndex, 1, newArt);

        // Save
        profile.save().then(profile => res.json(profile));
    })
    .catch(err => res.status(404).json({ msg: 'There is no article for this art_id' }));
});

// @route  DELETE api/profile/article/art_id
// @desc   Decrese article's number
// @access Public
router.delete('/article/:handle/:art_id', (req, res) => {
    Profile.findOne({ handle: req.params.handle })
    .populate('user', ['name'])
    .then(profile => {
        const removeIndex = profile.article
        .map(item => item.id)
        .indexOf(req.params.art_id);

        const newArt = {
            title: profile.article[removeIndex].title,
            description: profile.article[removeIndex].description,
            date: profile.article[removeIndex].date,
            like: profile.article[removeIndex].like,
            hate: profile.article[removeIndex].hate + 1
        }
        
        // Splice out of array
        profile.article.splice(removeIndex, 1, newArt);

        // Save
        profile.save().then(profile => res.json(profile));
    })
    .catch(err => res.status(404).json({ msg: 'There is no article for this art_id' }));
});

// @route  DELETE api/profile
// @desc   Delete user and profile
// @access Private
router.delete('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    Profile.findOneAndRemove({ user: req.user.id })
    .then(() => {
      User.findOneAndRemove({ _id: req.user.id })
      .then(() => {
          res.json({ success: true });
      });  
    });
});

module.exports = router;