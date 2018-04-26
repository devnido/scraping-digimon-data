const mongoose = require('mongoose')

mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/digimondb')

const egg = mongoose.Schema({
    name: String,
    image: String,
    evolvesTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Baby'
    }
});

const Egg = mongoose.model('Egg', egg);

Egg.findOne({
        name: 'Yellow Polkadot Egg'
    })
    .then(egg => {
        if (egg) {
            console.log(egg)
        } else {
            console.log({
                ok: 0,
                message: `egg ${name} doesn't exist`
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