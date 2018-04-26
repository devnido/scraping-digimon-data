const digimons = [Promise.resolve('agumon'), Promise.resolve('gabumon'), Promise.resolve('guilmon'), Promise.resolve('biyomon')]

async function prueba() {
    for await (const x of digimons) {
        console.log(x)
    }
}

prueba()