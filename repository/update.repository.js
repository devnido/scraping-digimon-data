const mongoose = require('mongoose')

const Egg = require('../models/egg.model')
const Baby = require('../models/baby.model')
const InTraining = require('../models/in-training.model')
const Rookie = require('../models/rookie.model')
const Champion = require('../models/champion.model')
const Ultimate = require('../models/ultimate.model')
const Mega = require('../models/mega.model')

const findRepository = require('./find.repository')


/** setEvolvesFrom and setEvolvesTo */

const repository = {
    updateEgg: (name, evolvesToBaby) => {
        return new Promise((resolve, reject) => {

            const eggPromise = findRepository.findEgg(name)
            const babyPromise = findRepository.findBaby(evolvesToBaby)

            Promise.all([eggPromise, babyPromise])
                .then(result => {

                    const [egg, baby] = result

                    egg.evolvesTo = baby._id
                    return egg.save()

                })
                .then(result => {
                    resolve(result)
                })
                .catch(err => {
                    reject(err)
                })
        })
    },
    updateBaby: (name, evolvesFromEgg, evolvesToInTrainig) => {


        return new Promise((resolve, reject) => {

            const eggPromise = findRepository.findEgg(evolvesFromEgg)
            const babyPromise = findRepository.findBaby(name)
            const inTrainingPromise = findRepository.findInTraining(evolvesToInTrainig)

            Promise.all([eggPromise, babyPromise, inTrainingPromise])
                .then(result => {



                    const [egg, baby, inTraining] = result


                    baby.evolvesFrom = egg._id
                    baby.evolvesTo = inTraining._id
                    return baby.save()

                })
                .then(result => {
                    resolve(result)
                })
                .catch(err => {
                    reject(err)
                })
        })
    },

    updateInTrainingEvolvesFrom: (name, evolvesFromBaby) => {
        return new Promise((resolve, reject) => {

            const babyPromise = findRepository.findBaby(evolvesFromBaby)
            const inTrainingPromise = findRepository.findInTraining(name)
            const rookiePromise = findRepository.findRookie(evolvesToRookie)

            Promise.all([eggPromise, babyPromise, inTrainingPromise])
                .then(result => {

                    const [baby, inTraining, rookie] = result

                    inTraining.evolvesFrom = baby._id
                    inTraining.evolvesTo.push({
                        digimon: rookie,
                        stats: statsToRookie
                    })
                    return inTraining.save()

                })
                .then(result => {
                    resolve(result)
                })
                .catch(err => {
                    reject(err)
                })
        })

    },
    updateInTrainingEvolvesTo: (name, evolvesToRookie) => {
        return new Promise((resolve, reject) => {

            const inTrainingPromise = findRepository.findInTraining(name)
            const rookiePromise = findRepository.findRookie(evolvesToRookie)

            Promise.all([eggPromise, babyPromise, inTrainingPromise])
                .then(result => {

                    const [baby, inTraining, rookie] = result

                    inTraining.evolvesFrom = baby._id
                    inTraining.evolvesTo.push({
                        digimon: rookie,
                        stats: statsToRookie
                    })
                    return inTraining.save()

                })
                .then(result => {
                    resolve(result)
                })
                .catch(err => {
                    reject(err)
                })
        })

    },
    updateRookie: (name, evolvesFromInTraining, statsFromInTraining, evolvesToChampion, statsToChampion) => {
        return new Promise((resolve, reject) => {

            const inTrainingPromise = findRepository.findInTraining(evolvesFromInTraining)
            const rookiePromise = findRepository.findRookie(name)
            const championPromise = findRepository.findChampion(evolvesToChampion)

            Promise.all([inTrainingPromise, rookiePromise, championPromise])
                .then(result => {

                    const [inTraining, rookie, champion] = result

                    rookie.evolvesFrom.push({
                        digimon: inTraining._id,
                        stats: statsFromInTraining
                    })

                    rookie.evolvesTo.push({
                        digimon: champion._id,
                        stats: statsToChampion
                    })

                    return rookie.save()
                })
                .then(result => {
                    resolve(result)
                })
                .catch(err => {
                    reject(err)
                })
        })
    },
    updateChampion: (name, evolvesFromRookie, statsFromRookie, evolvesToUltimate, statsToUltimate) => {
        return new Promise((resolve, reject) => {


            const rookiePromise = findRepository.findRookie(evolvesFromRookie)
            const championPromise = findRepository.findChampion(name)
            const ultimatePromise = findRepository.findUltimate(evolvesToUltimate)

            Promise.all([rookiePromise, championPromise, ultimatePromise])
                .then(result => {

                    const [rookie, champion, ultimate] = result

                    champion.evolvesFrom.push({
                        digimon: rookie._id,
                        stats: statsFromRookie
                    })

                    champion.evolvesTo.push({
                        digimon: ultimate._id,
                        stats: statsToUltimate
                    })

                    return champion.save()
                })
                .then(result => {
                    resolve(result)
                })
                .catch(err => {
                    reject(err)
                })
        })
    },
    updateUltimate: (name, evolvesFromChampion, statsFromChampion, evolvesToMega, statsToMega) => {
        return new Promise((resolve, reject) => {

            const championPromise = findRepository.findChampion(evolvesFromChampion)
            const ultimatePromise = findRepository.findUltimate(name)
            const megaPromise = findRepository.findMega(evolvesToMega)

            Promise.all([championPromise, ultimatePromise, megaPromise])
                .then(result => {

                    const [champion, ultimate, mega] = reuslt

                    ultimate.evolvesFrom.push({
                        digimon: champion._id,
                        stats: statsFromChampion
                    })

                    ultimate.evolvesTo.push({
                        digimon: mega._id,
                        stats: statsToMega
                    })

                    return ultimate.save()
                })
                .then(result => {
                    resolve(result)
                })
                .catch(err => {
                    reject(err)
                })
        })
    },
    updateMega: (name, evolvesFromUltimate, statsFromUltimate) => {

        return new Promise((resolve, reject) => {

            const ultimatePromise = findRepository.findUltimate(evolvesFromUltimate)
            const megaPromise = findRepository.findMega(name)

            Promise.all([ultimatePromise, megaPromise])
                .then(result => {

                    const [ultimate, mega] = result

                    mega.evolvesFrom.push({
                        digimon: ultimate._id,
                        stats: statsFromUltimate
                    })

                    return mega.save()
                })
                .then(result => {
                    resolve(result)
                })
                .catch(err => {
                    reject(err)
                })
        })
    }
}

module.exports = repository


function setDigimonID(phase, array) {

}