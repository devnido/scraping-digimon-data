const mongoose = require('mongoose')

mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/digimondb')

const Baby = require('./models/baby.model')

Baby.findOne({
        name: 'Conomon'
    })
    .then(baby => {
        if (baby) {
            console.log(baby)
        } else {

            console.log({
                ok: 0,
                message: `baby ${name} doesn't exist`
            })
        }
    })
    .catch(err => {
        console.log({
            ok: 0,
            message: `An error has occurred`,
            error: err
        })
    })