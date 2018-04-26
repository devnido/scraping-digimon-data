function randomResolve(number) {
    return new Promise(resolve =>
        setTimeout(() => {
            console.log(number)
            resolve(number)
        }, 100 * Math.random())
    )
}

Promise.all([randomResolve(1),
        randomResolve(2),
        randomResolve(3),
        randomResolve(4),
        randomResolve(5),
        randomResolve(6),
        randomResolve(7),
        randomResolve(8),
        randomResolve(9),
        randomResolve(10),
        randomResolve(11),
        randomResolve(12),
        randomResolve(13),
        randomResolve(14),
        randomResolve(15),
        randomResolve(16),
        randomResolve(17)
    ])
    .then(result => {
        console.log(result)
    })