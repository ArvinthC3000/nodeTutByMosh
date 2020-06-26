// Synchronous & Async
console.log("Before");
getUser(1, function (user) {
    console.log('User', user)
})
console.log("After");

// Promises
// Async await // syntatic sugar

// CallBacks
function getUser(id, callback) {
    setTimeout(() => {
        console.log("Reading from DB");
        callback({ id: id, userName: 'Arvinth' })
    }, 2000)
}
