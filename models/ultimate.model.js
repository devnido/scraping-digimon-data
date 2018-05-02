const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ultimate = new Schema({
    name: String,
    image: String,
    evolvesTo: [{
        phase: String,
        digimon: {
            type: Schema.Types.ObjectId,
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
            type: Schema.Types.ObjectId,
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

const Ultimate = mongoose.model('Ultimate', ultimate);

module.exports = Ultimate;