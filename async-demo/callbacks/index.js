// Synchronous & Async

// Promises
// Async await // syntatic sugar

// CallBacks //Callback HELL
console.log("Before");
getUser(1, (user) => {
    console.log('User', user)
    getRepoLists(user.userName, (list) => {
        console.log('Repos: ', list)

    })
})
console.log("After");

function getUser(id, callback) {
    setTimeout(() => {
        console.log("Reading from DB");
        callback({ id: id, userName: 'Arvinth' })
    }, 2000)
}

function getRepoLists(username, callback) {
    setTimeout(() => {
        console.log("Calling git API");
        callback(['repo1', 'repo2', 'repo3'])
    }, 2000)
}