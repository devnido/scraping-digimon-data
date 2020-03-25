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
    setEggEvolvesTo: async(name, evolvesToBaby) => {

        const [egg, baby] = await Promise.all([findRepository.findEgg(name), findRepository.findBaby(evolvesToBaby)])

        egg.evolvesTo = {
            phase: 'Baby',
            digimon: baby
        }

        return egg.save()
    },
    setBabyEvolvesFrom: async(name, evolvesFromEgg) => {

        const [egg, baby] = await Promise.all([findRepository.findEgg(evolvesFromEgg), findRepository.findBaby(name)])

        baby.evolvesFrom = {
            phase: 'Egg',
            digimon: egg
        }

        return baby.save()
    },
    setBabyEvolvesTo: async(name, evolvesToInTrainig) => {

        const [baby, inTraining] = await Promise.all([findRepository.findBaby(name), findRepository.findInTraining(evolvesToInTrainig)])

        baby.evolvesTo = {
            phase: 'InTraining',
            digimon: inTraining
        }

        return baby.save()
    },
    setInTrainingEvolvesFrom: async(name, evolvesFromBaby) => {

        const [baby, inTraining] = await Promise.all([findRepository.findBaby(evolvesFromBaby), findRepository.findInTraining(name)])

        inTraining.evolvesFrom = {
            phase: 'Baby',
            digimon: baby
        }

        return inTraining.save()
    },
    setInTrainingEvolvesTo: async(name, evolvesToRookie, statsToRookie) => {

        const [rookie, inTraining] = await Promise.all([findRepository.findInTraining(name), findRepository.findRookie(evolvesToRookie)])

        inTraining.evolvesTo.push({
            phase: 'Rookie',
            digimon: rookie,
            stats: statsToRookie
        })

        return inTraining.save()
    },
    setRookieEvolvesFrom: async(name, evolvesFromInTraining, statsFromInTraining) => {

        const [inTraining, rookie] = await Promise.all([findRepository.findInTraining(evolvesFromInTraining), findRepository.findRookie(name)])

        rookie.evolvesFrom.push({
            phase: 'InTraining',
            digimon: inTraining,
            stats: statsFromInTraining
        })

        return rookie.save()
    },
    setRookieEvolvesTo: async(name, evolvesToChampion, statsToChampion) => {

        const rookiePromise = findRepository.findRookie(name)

        if (evolvesToChampion == "Arresterdramon" || evolvesToChampion == "OmniShoutmon") {

            const [rookie, mega] = await Promise.all([findRepository.findRookie(name), findRepository.findMega(evolvesToChampion)])

            rookie.evolvesTo.push({
                phase: 'Mega',
                digimon: mega,
                stats: statsToChampion
            })

        } else {

            const [rookie, champion] = await Promise.all([findRepository.findRookie(name), findRepository.findChampion(evolvesToChampion)])

            rookie.evolvesTo.push({
                phase: 'Champion',
                digimon: champion,
                stats: statsToChampion
            })

        }

        return rookie.save()

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