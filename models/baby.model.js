const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const baby = new Schema({
    name: String,
    image: String,
    evolvesTo: {
        phase: String,
        digimon: {
            type: Schema.Types.ObjectId,
            refPath: 'evolvesTo.phase'
        }
    },
    evolvesFrom: {
        phase: String,
        digimon: {
            type: Schema.Types.ObjectId,
            refPath: 'evolvesFrom.phase'
        }
    },
});

const Baby = mongoose.model('Baby', baby);

module.exports = Baby;