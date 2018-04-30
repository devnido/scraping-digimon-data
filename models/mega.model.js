const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const mega = new Schema({
    name: String,
    image: String,
    evolvesFrom: [{
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
    }]
});

const Mega = mongoose.model('Mega', mega);

module.exports = Mega;