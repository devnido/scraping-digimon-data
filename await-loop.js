const digimons = [Promise.resolve('agumon'), Promise.resolve('gabumon'), Promise.resolve('guilmon'), Promise.resolve('biyomon')]

async function prueba() {

    const result = await Promise.all(digimons)

    console.log(result)
    console.log('done')
}


prueba()