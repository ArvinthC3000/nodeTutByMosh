// Promises

const p = new Promise((resolve, reject) => {
    setTimeout(() => {
        // resolve(1)
        reject(new Error('Failed'))
    })
})

p
    .then(result => console.log(result))
    .catch(err => console.log('Error', err.message))