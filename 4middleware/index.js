const config = require('config')
const morgan = require('morgan')
const helmet = require('helmet')
const Joi = require('joi')
const { authenticater, logger } = require('./authenticater')
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
// if (app.get('env') === "development")
//     app.use(morgan('tiny'))

// // Custom Middleware
// app.use(logger)

// app.use(authenticater)

const courses = [
    { id: 1, name: 'course1' },
    { id: 2, name: 'course2' },
    { id: 3, name: 'course3' }
]

app.get('/', (req, res) => {
    res.render('index', { title: 'My express app', message: 'Hello' })
})

app.get('/api/courses', (req, res) => {
    res.send(courses)
})

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if (!course) return res.status(404).send("No course id found for fiven ID.")
    res.send(course)
})

app.post('/api/courses', (req, res) => {

    const { error } = validateCourse(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    const course = {
        id: courses.length + 1,
        name: req.body.name
    }
    courses.push(course)
    res.send(courses)
})

app.put('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if (!course) return res.status(404).send("No course id found for given ID.")

    const { error } = validateCourse(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    course.name = req.body.name
    res.send(course)
})

app.delete('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if (!course) return res.status(404).send("No course id found for given ID.")

    const index = courses.indexOf(courses);
    courses.splice(index, 1)

    res.send(courses)
})

function validateCourse(course) {
    const schema = {
        name: Joi.string().min(3).required()
    }
    return Joi.validate(course, schema);
}

const port = 3000
app.listen(port, () => {
    console.log('Listening on port: ' + port)
})