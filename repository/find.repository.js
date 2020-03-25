const mongoose = require('mongoose')

const Egg = require('../models/egg.model')
const Baby = require('../models/baby.model')
const InTraining = require('../models/in-training.model')
const Rookie = require('../models/rookie.model')
const Champion = require('../models/champion.model')
const Ultimate = require('../models/ultimate.model')
const Mega = require('../models/mega.model')

const repository = {

    findEgg: name => Egg.findOne({ name }),

    findBaby: name => Baby.findOne({ name }),

    findInTraining: name => InTraining.findOne({ name }),

    findRookie: name => Rookie.findOne({ name }),

    findChampion: name => Champion.findOne({ name }),

    findUltimate: name => Ultimate.findOne({ name }),

    findMega: (name) => Mega.findOne({ name }),

}

module.exports = repository