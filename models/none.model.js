const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const none = new Schema({
    name: String,
    image: String,
    evolvesTo: [{
        phase: String,
        digimon: {
            type: ObjectId,
            refPath: 'evolvesTo.phase'
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
        phase: String,
        digimon: {
            type: ObjectId,
            refPath: 'evolvesFrom.phase'
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

const None = mongoose.model('None', none);

module.exports = None;