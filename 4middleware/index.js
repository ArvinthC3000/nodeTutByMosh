const config = require('config')
const morgan = require('morgan')
const helmet = require('helmet')
const course = require('./routes/courses')
const home = require('./routes/home')
const Joi = require('joi')
const { authenticater, logger } = require('./middleware/authenticater')
const express = require('express')

const app = express()

console.log('Application Name: ' + config.get('name'));
console.log('Mail Server: ' + config.get('mail.host'));
// console.log('Mail Password: ' + config.get('mail.password'));


// console.log("NODE_ENV: " + process.env.NODE_ENV);       // By default - undefined
// console.log("app: " + app.get('env'));                  // By default - developement

app.set('view engine', 'pug')
app.set('views', './views')  // Default

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(logger)
app.use(authenticater)

// Route
app.use('/', home)
app.use('/api/courses', course)

const port = 3000
app.listen(port, () => {
    console.log('Listening on port: ' + port)
})