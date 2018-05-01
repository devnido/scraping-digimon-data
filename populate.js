const mongoose = require('mongoose')

mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/digimondb')

const Egg = require('./models/egg.model')


Egg.findOne({
        name: 'Red Egg'
    })
    .populate('evolvesTo')
    .exec((err, rookie) => {
        if (err)
            console.log(err)

        console.log(rookie)
    })