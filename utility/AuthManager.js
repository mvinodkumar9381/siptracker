const jwt = require('jsonwebtoken')

const SECRET_KEY = 'secret'

const signJWT = (payload) => {

    try {

        return jwt.sign(
            payload,
            SECRET_KEY,
            {
                expiresIn: '1d'
            }
        )

    } catch (err) {

        return err.message
    }
}

const verifyJWT = (token) => {

    try {

        return jwt.verify(
            token,
            SECRET_KEY
        )

    } catch (err) {

        return err.message
    }
}

module.exports = {
    signJWT,
    verifyJWT
}