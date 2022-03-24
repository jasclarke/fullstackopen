const logger = require('./logger')

const errorHandler = (error, request, response, next) => {
    logger.error(error.message)

    if (error.name === 'ValidationError') {
        response.statusMessage = error.message
        return response.status(400).json({ error: error.message })
    }

    next(error)
}

module.exports = {
    errorHandler
}