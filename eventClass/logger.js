const EventEmitter = require('events');


const url = 'http://arvinth.io/log';

class Logger extends EventEmitter {
    log(message) {
        // Send an HTTP req
        console.log(message)

        // Raise an event
        this.emit('messageLogged', { id: 1, url: url })
    }
}

module.exports = Logger