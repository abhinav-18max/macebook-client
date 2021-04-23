const express = require('express')
const router = express.Router()

const auth = require('./auth')
const users = require('./db/users.json')
const {getUserData, generateToken} = require('./utils')

router.get('/users', auth, (req, res) => {
    const data = users.results.map(user => getUserData(user))
    res.status(200).json(data)
})

router.get('/users/:username', auth, (req, res) => {
    const {username} = req.params
    const user = users.results.find(user => user.username == username)
    if(!user) return res.status(404).end("user not found!")
    res.status(200).json(getUserData(user))
})

router.post('/login', (req, res) => {
    const {username, password} = req.body
    if (!username || !password) return res.status(400).end("invalid credentials")

    const user = users.results.find(user => user.username == username)
    if(!user) return res.status(404).end("user not found!")
    if(user.password != password) return res.status(400).end("invalid credentials")

    return res.status(200).json({user: getUserData(user),"token": generateToken(username)})
})

module.exports = router