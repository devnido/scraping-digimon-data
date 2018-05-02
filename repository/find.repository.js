const mongoose = require('mongoose')

const Egg = require('../models/egg.model')
const Baby = require('../models/baby.model')
const InTraining = require('../models/in-training.model')
const Rookie = require('../models/rookie.model')
const Champion = require('../models/champion.model')
const Ultimate = require('../models/ultimate.model')
const Mega = require('../models/mega.model')

const repository = {
    findEgg: (name) => {
        return new Promise((resolve, reject) => {
            Egg.findOne({
                    name: name
                })
                .then(egg => {
                    if (egg) {
                        resolve(egg)
                    } else {
                        reject(`egg ${name} doesn't exist`)
                    }
                })
                .catch(err => {
                    reject(err)
                })
        })
    },
    findBaby: (name) => {
        return new Promise((resolve, reject) => {
            Baby.findOne({
                    name: name
                })
                .then(baby => {
                    if (baby) {
                        resolve(baby)
                    } else {

                        reject(`baby ${name} doesn't exist`)
                    }
                })
                .catch(err => {
                    reject(err)
                })
        })

    },
    findInTraining: (name) => {
        return new Promise((resolve, reject) => {
            InTraining.findOne({
                    name: name
                })
                .then(inTraining => {
                    if (inTraining) {
                        resolve(inTraining)
                    } else {
                        reject(`In Training ${name} doesn't exist`)
                    }
                })
                .catch(err => {
                    reject(err)
                })
        })

    },
    findRookie: (name) => {
        return new Promise((resolve, reject) => {
            Rookie.findOne({
                    name: name
                })
                .then(rookie => {
                    if (rookie) {
                        resolve(rookie)
                    } else {
                        reject(`Rookie ${name} doesn't exist`)
                    }
                })
                .catch(err => {
                    reject(err)
                })
        })
    },
    findChampion: (name) => {
        return new Promise((resolve, reject) => {
            Champion.findOne({
                    name: name
                })
                .then(champion => {
                    if (champion) {
                        resolve(champion)
                    } else {
                        reject(`Champion ${name} doesn't exist`)
                    }
                })
                .catch(err => {
                    reject(err)
                })
        })
    },
    findUltimate: (name) => {
        return new Promise((resolve, reject) => {
            Ultimate.findOne({
                    name: name
                })
                .then(ultimate => {
                    if (ultimate) {
                        resolve(ultimate)
                    } else {
                        reject(`Ultimate ${name} doesn't exist`)
                    }
                })
                .catch(err => {
                    reject(err)
                })
        })

    },
    findMega: (name) => {
        return new Promise((resolve, reject) => {
            Mega.findOne({
                    name: name
                })
                .then(mega => {
                    if (mega) {
                        resolve(mega)
                    } else {
                        reject(`Mega ${name} doesn't exist`)
                    }
                })
                .catch(err => {
                    reject(err)
                })
        })

    },

}

module.exports = repository