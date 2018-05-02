const Baby = require('./baby.model')
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const egg = new Schema({
    name: String,
    image: String,
    evolvesTo: {
        phase: String,
        digimon: {
            type: Schema.Types.ObjectId,
            refPath: 'evolvesTo.phase'
        }
    }
});

const Egg = mongoose.model('Egg', egg);

module.exports = Egg;