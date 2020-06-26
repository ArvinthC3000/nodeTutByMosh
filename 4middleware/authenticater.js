module.exports.authenticater = function (req, res, next) {
    console.log("Authentication...");
    next()
}

module.exports.logger = function (req, res, next) {
    console.log("Logging...")
    next()          // Passing control to next middleware
}