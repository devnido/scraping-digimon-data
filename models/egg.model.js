const Baby = require('./baby.model')
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const egg = new Schema({
    name: String,
    image: String,
    evolvesTo: {
        type: Schema.Types.ObjectId,
        ref: 'Baby'
    }
});

const Egg = mongoose.model('Egg', egg);

module.exports = Egg;