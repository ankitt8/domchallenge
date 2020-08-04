const express = require('express')
const router = express.Router()
const path = require('path')

// 
router.get('/', (req, res) => {
    // req.session.destroy()
    console.log(__dirname)
    res.sendFile('login.html', {root: path.join(__dirname, '..', 'public')} ,(err) => console.log(err))
})

router.get('/game', (req, res) => {
    res.sendFile('game.html', {root: path.join(__dirname, '..', 'public')}, (err) => console.log(err));
})

module.exports = router;