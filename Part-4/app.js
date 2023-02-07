const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
const logger = require('./utils/logger')
const mongoose = require('mongoose')
const config = require('./utils/config')
const middleware = require('./utils/middleware')

const blogsRouter = require('./controllers/blog')
const morgan = require('morgan')


mongoose.set('strictQuery', false)

logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
.then(() => logger.info(`Mongoose connected!`))
.catch(error => logger.error(`Cant connect to mongoose: ${error}`))


app.use(cors())
app.use(express.json())
app.use(morgan((tokens, req, res) => {
    return [
        tokens.method(req, res), 
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms',
        JSON.stringify(req.body)
    ].join(' ')
}))

app.use('/blogs', blogsRouter )

app.use(middleware.errorHandler)
app.use(middleware.unknownEndpoint)


module.exports = app



