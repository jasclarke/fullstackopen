const logger = require('./logger')

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

const tokenExtractor = (request, response, next) => {
    const authorization = request.get('authorization')

    if (authorization && authorization.toLowerCase()) {
        logger.info('token is present')
        request.token = authorization.substring(7)
    } else {
        logger.info('token not present')
        request.token = null
    }

    next()
}

module.exports = {
    errorHandler,
    tokenExtractor
}