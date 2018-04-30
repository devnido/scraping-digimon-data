const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const champion = new Schema({
    name: String,
    image: String,
    evolvesTo: [{
        _id: false,
        digimon: {
            type: Schema.Types.ObjectId,
            ref: 'Ultimate'
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
    }]
});

const Champion = mongoose.model('Champion', champion);

module.exports = Champion;