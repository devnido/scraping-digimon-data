const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const rookie = new Schema({
    name: String,
    image: String,
    evolvesTo: [{
        digimon: {
            type: Schema.Types.ObjectId,
            ref: 'Champion'
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
    evolvesFrom: [{
        digimon: {
            type: Schema.Types.ObjectId,
            ref: 'InTraining'
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
    }]
});

const Rookie = mongoose.model('Rookie', rookie);

module.exports = Rookie;