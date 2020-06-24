const express = require('express')
const app = express()

app.get('/', (req, res) => {
    res.send("Hello World!!!")
})

app.get('/api/courses', (req, res) => {
    res.send([1, 2, 3])
})

/*Router Parameter*/

app.get('/api/courses/:id', (req, res) => {             // :router parameter
    res.send(req.params.id)
})

// app.get('/api/posts/:year/:month', (req, res) => {             // :parameter
//     res.send(req.params)
// })

/*Query string Parameter*/
app.get('/api/posts/:year/:month', (req, res) => {             // ? query parameter
    res.send(req.query)
})

// PORT
const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log('Listening on port: ' + port)
})

// // HTTP methods
// app.get()
// app.put()
// app.post()
// app.delete()