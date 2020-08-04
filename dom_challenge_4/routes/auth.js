const express = require('express')
const passport = require('passport')
const router = express.Router()


/* 
    @desc google auth
    @route GET /auth/google
*/
// router.get('/google', passport.authenticate('google', { scope: ['profile'] }))
router.get('/google', passport.authenticate('google', { scope: ['profile'] }))

/* 
    @desc google auth faliure route
    @route GET /auth/google/callback
*/
router.get(
    '/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    function (req, res) {
        console.log(res)
        res.redirect('/game');
    });

module.exports = router
