const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const baby = new Schema({
    name: String,
    image: String,
    evolvesTo: {
        type: Schema.Types.ObjectId,
        ref: 'InTraining'

    },
    evolvesFrom: {
        type: Schema.Types.ObjectId,
        ref: 'Egg'
    },
});

const Baby = mongoose.model('Baby', baby);

module.exports = Baby;