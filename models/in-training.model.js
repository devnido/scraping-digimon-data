const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const intraining = new Schema({
    name: String,
    image: String,
    evolvesTo: [{
        _id: false,
        digimon: {
            type: Schema.Types.ObjectId,
            ref: 'Rookie'
        },
        stats: {
            hp: String,
            mp: String,
            strength: String,
            stamina: String,
            wisdom: String,
            speed: String,
            weight: String,
            mistakes: String,
            bond: String,
            discipline: String,
            wins: String,
            keyDigimon: String,
            keyPoints: String,
        }
    }],
    evolvesFrom: {
        type: Schema.Types.ObjectId,
        ref: 'Baby'
    }
});

const InTraining = mongoose.model('InTraining', intraining);

module.exports = InTraining;