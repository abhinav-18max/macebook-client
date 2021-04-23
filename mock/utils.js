const users = require('./db/users.json')
const jwt = require('jsonwebtoken')

const PRIVATE_KEY = "abkdhneji452ds8"

exports.getUserData = (user) => {
    return {
        username: user.username,
        name: user.name.fullname,
        gender: user.gender,
        email: user.email,
        phone: user.phone,
        picture: user.picture.medium,
        location: user.location.city + ', ' + user.location.country
    }
}

exports.generateToken = (username) => {
    return jwt.sign({ username }, PRIVATE_KEY)
};
