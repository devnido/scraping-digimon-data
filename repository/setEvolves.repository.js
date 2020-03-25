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

        const [egg, baby] = await Promise.all([findRepository.findEgg(name), findRepository.findBaby(evolvesToBaby)])

        egg.evolvesTo = {
            phase: 'Baby',
            digimon: baby
        }

        return egg.save()
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
                        digimon: inTraining
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

                    inTraining.evolvesFrom = {
                        phase: 'Baby',
                        digimon: baby
                    }

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
                        phase: 'Rookie',
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
    setRookieEvolvesFrom: (name, evolvesFromInTraining, statsFromInTraining) => {
        return new Promise((resolve, reject) => {

            const inTrainingPromise = findRepository.findInTraining(evolvesFromInTraining)
            const rookiePromise = findRepository.findRookie(name)

            Promise.all([inTrainingPromise, rookiePromise])
                .then(result => {

                    const [inTraining, rookie] = result

                    rookie.evolvesFrom.push({
                        phase: 'InTraining',
                        digimon: inTraining,
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


            if (evolvesToChampion == "Arresterdramon" || evolvesToChampion == "OmniShoutmon") {

                const megaPromise = findRepository.findMega(evolvesToChampion)

                Promise.all([rookiePromise, megaPromise])
                    .then(result => {

                        const [rookie, mega] = result

                        rookie.evolvesTo.push({
                            phase: 'Mega',
                            digimon: mega,
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

                const championPromise = findRepository.findChampion(evolvesToChampion)

                Promise.all([rookiePromise, championPromise])
                    .then(result => {

                        const [rookie, champion] = result

                        rookie.evolvesTo.push({
                            phase: 'Champion',
                            digimon: champion,
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
            }

        })

    },
    setChampionEvolvesFrom: (name, evolvesFromRookie, statsFromRookie) => {
        return new Promise((resolve, reject) => {

            const rookiePromise = findRepository.findRookie(evolvesFromRookie)

            if (name === "Arresterdramon" || name === "OmniShoutmon") {
                const megaPromise = findRepository.findMega(name)

                Promise.all([rookiePromise, megaPromise])
                    .then(result => {

                        const [rookie, mega] = result

                        mega.evolvesFrom.push({
                            phase: 'Rookie',
                            digimon: rookie,
                            stats: statsFromRookie
                        })

                        return mega.save()
                    })
                    .then(result => {
                        resolve(result)
                    })
                    .catch(err => {
                        reject(err)
                    })

            } else {
                const championPromise = findRepository.findChampion(name)

                Promise.all([rookiePromise, championPromise])
                    .then(result => {

                        const [rookie, champion] = result

                        champion.evolvesFrom.push({
                            phase: 'Rookie',
                            digimon: rookie,
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
                        phase: 'Ultimate',
                        digimon: ultimate,
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
                        phase: 'Champion',
                        digimon: champion,
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
                        phase: 'Mega',
                        digimon: mega,
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
                        phase: 'Ultimate',
                        digimon: ultimate,
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