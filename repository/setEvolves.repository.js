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
    setEggEvolvesTo: (name, evolvesToBaby) => {
        return new Promise((resolve, reject) => {

            const eggPromise = findRepository.findEgg(name)
            const babyPromise = findRepository.findBaby(evolvesToBaby)

            Promise.all([eggPromise, babyPromise])
                .then(result => {

                    const [egg, baby] = result

                    egg.evolvesTo = baby
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
    setBabyEvolvesFrom: (name, evolvesFromEgg) => {

        return new Promise((resolve, reject) => {

            const eggPromise = findRepository.findEgg(evolvesFromEgg)
            const babyPromise = findRepository.findBaby(name)

            Promise.all([eggPromise, babyPromise])
                .then(result => {
                    const [egg, baby] = result

                    baby.evolvesFrom = {
                        phase: 'Egg',
                        digimon: egg
                    }
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
    setBabyEvolvesTo: (name, evolvesToInTrainig) => {
        return new Promise((resolve, reject) => {

            const babyPromise = findRepository.findBaby(name)
            const inTrainingPromise = findRepository.findInTraining(evolvesToInTrainig)

            Promise.all([babyPromise, inTrainingPromise])
                .then(result => {

                    const [baby, inTraining] = result

                    baby.evolvesTo = {
                        phase: 'InTraining',
                        digimon: inTraining._id
                    }
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
    setInTrainingEvolvesFrom: (name, evolvesFromBaby) => {
        return new Promise((resolve, reject) => {

            const babyPromise = findRepository.findBaby(evolvesFromBaby)
            const inTrainingPromise = findRepository.findInTraining(name)

            Promise.all([babyPromise, inTrainingPromise])
                .then(result => {

                    const [baby, inTraining] = result

                    inTraining.evolvesFrom = baby._id

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
    setInTrainingEvolvesTo: (name, evolvesToRookie, statsToRookie) => {

        return new Promise((resolve, reject) => {

            const inTrainingPromise = findRepository.findInTraining(name)
            const rookiePromise = findRepository.findRookie(evolvesToRookie)

            Promise.all([rookiePromise, inTrainingPromise])
                .then(result => {

                    const [rookie, inTraining] = result

                    inTraining.evolvesTo.push({
                        digimon: rookie._id,
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
    setRookieEvolvesFrom: (name, evolvesFromInTraining, statsFromInTraining) => {
        return new Promise((resolve, reject) => {

            const inTrainingPromise = findRepository.findInTraining(evolvesFromInTraining)
            const rookiePromise = findRepository.findRookie(name)

            Promise.all([inTrainingPromise, rookiePromise])
                .then(result => {

                    const [inTraining, rookie] = result

                    rookie.evolvesFrom.push({
                        digimon: inTraining._id,
                        stats: statsFromInTraining
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
    setRookieEvolvesTo: (name, evolvesToChampion, statsToChampion) => {

        return new Promise((resolve, reject) => {

            const rookiePromise = findRepository.findRookie(name)


            if (evolvesToChampion !== "Arresterdramon" && evolvesToChampion !== "OmniShoutmon") {
                const championPromise = findRepository.findChampion(evolvesToChampion)

                Promise.all([rookiePromise, championPromise])
                    .then(result => {

                        const [rookie, champion] = result

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

            } else {

                resolve('Digimon doesnt exist')
            }

        })

    },
    setChampionEvolvesFrom: (name, evolvesFromRookie, statsFromRookie) => {
        return new Promise((resolve, reject) => {

            const rookiePromise = findRepository.findRookie(evolvesFromRookie)

            if (name !== "Arresterdramon" && name !== "OmniShoutmon") {
                const championPromise = findRepository.findChampion(name)

                Promise.all([rookiePromise, championPromise])
                    .then(result => {

                        const [rookie, champion] = result

                        champion.evolvesFrom.push({
                            digimon: rookie._id,
                            stats: statsFromRookie
                        })

                        return champion.save()
                    })
                    .then(result => {
                        resolve(result)
                    })
                    .catch(err => {
                        reject(err)
                    })

            } else {
                resolve("Digimon doesnt exist")
            }
        })
    },
    setChampionEvolvesTo: (name, evolvesToUltimate, statsToUltimate) => {
        return new Promise((resolve, reject) => {

            const championPromise = findRepository.findChampion(name)
            const ultimatePromise = findRepository.findUltimate(evolvesToUltimate)

            Promise.all([championPromise, ultimatePromise])
                .then(result => {

                    const [champion, ultimate] = result

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
    setUltimateEvolvesFrom: (name, evolvesFromChampion, statsFromChampion) => {
        return new Promise((resolve, reject) => {

            const championPromise = findRepository.findChampion(evolvesFromChampion)
            const ultimatePromise = findRepository.findUltimate(name)

            Promise.all([championPromise, ultimatePromise])
                .then(result => {

                    const [champion, ultimate] = result

                    ultimate.evolvesFrom.push({
                        digimon: champion._id,
                        stats: statsFromChampion
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
    setUltimateEvolvesTo: (name, evolvesToMega, statsToMega) => {
        return new Promise((resolve, reject) => {

            const ultimatePromise = findRepository.findUltimate(name)
            const megaPromise = findRepository.findMega(evolvesToMega)

            Promise.all([ultimatePromise, megaPromise])
                .then(result => {

                    const [ultimate, mega] = result

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
    setMegaEvolvesFrom: (name, evolvesFromUltimate, statsFromUltimate) => {

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