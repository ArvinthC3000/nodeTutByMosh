const Logger = require('./logger');
const logger = new Logger;


// Lister event     
logger.on('messageLogged', (arg) => {
    console.log('Listener called', arg)
})

logger.log('message')