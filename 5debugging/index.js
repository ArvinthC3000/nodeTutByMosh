const morgan = require('morgan')
const express = require('express')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
if (app.get('env') === "development") {
    app.use(morgan('tiny'))
    console.log('Morgan enabled...');
}

const port = 3000
app.listen(port, () => {
    console.log('Listening on port: ' + port)
})