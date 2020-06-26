const startupDebugger = require('debug')('app:startup')
const dbDebugger = require('debug')('app:db')
const morgan = require('morgan')
const express = require('express')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

// set DEBUG=app:startup
// set DEBUG=app:db
// set DEBUG=app:startup,app:db
// set DEBUG=app:*

if (app.get('env') === "development") {
    app.use(morgan('tiny'))
    startupDebugger('Morgan enabled...');
}
dbDebugger('DB connected...');

const port = 3000
app.listen(port, () => {
    console.log('Listening on port: ' + port)
})