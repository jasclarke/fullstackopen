const jwt = require('jsonwebtoken')
const User = require('../models/user')
const logger = require('./logger')

const getTokenFromHeader = request => {
    const authorization = request.get('authorization')

    if (authorization && authorization.toLowerCase()) {
        return authorization.substring(7)
    }

    return null
}

const errorHandler = (error, request, response, next) => {
    logger.error(error.message)

    if (error.name === 'ValidationError' || 'CastError') {
        response.statusMessage = error.message
        return response.status(400).json({ error: error.message })
    }

    if (error.name === 'JsonWebTokenError') {
        return response.status(401).json({
            error: 'invalid token'
        })
    }

    next(error)
}

const userExtractor = async (request, response, next) => {
    const token = jwt.verify(getTokenFromHeader(request), process.env.SECRET)

    if (!token.id) {
        return response.status(401).json({
            error: 'token missing or invalid'
        })
    }

    request.user = await User.findById(token.id)
    next()
}

module.exports = {
    errorHandler,
    userExtractor
}