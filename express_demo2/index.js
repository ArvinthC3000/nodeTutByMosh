const Joi = require('joi')
const express = require('express')
const app = express()

app.use(express.json())

const courses = [
    { id: 1, name: 'course1' },
    { id: 2, name: 'course2' },
    { id: 3, name: 'course3' }
]

// GET
app.get('/', (req, res) => {
    res.send("Hello World!!!")
})

app.get('/api/courses', (req, res) => {
    res.send(courses)
})

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if (!course) res.status(404).send("No course id found for fiven ID.")
    res.send(course)
})


// POST
app.post('/api/courses', (req, res) => {

    const { error } = validateCourse(req.body)
    if (error) {
        res.status(400).send(error.details[0].message)
        return;
    }
    const course = {
        id: courses.length + 1,
        name: req.body.name
    }
    courses.push(course)
    res.send(req.body)
})
// app.post('/api/courses', (req, res) => {
//     if (!req.body.name || req.body.name.length < 3) {
//         // 400 Bad request
//         res.status(400).send("Name is required and should be minimum 3 charaters")
//         return;
//     }
//     const course = {
//         id: courses.length + 1,
//         name: req.body.name
//     }
//     courses.push(course)
//     res.send(req.body)
// })


// PUT
app.put('/api/courses/:id', (req, res) => {
    // Look for courses
    // If not exsist, return 404
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if (!course) res.status(404).send("No course id found for fiven ID.")

    // const result = validateCourse(req.body)
    const { error } = validateCourse(req.body)
    // Validate
    // If invalid, retur 400, Bad request
    if (error) {
        res.status(400).send(error.details[0].message)
        return;
    }

    // Update course
    // Return updated course
    course.name = req.body.name
    req.send(course)
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