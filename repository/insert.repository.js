const Egg = require('../models/egg.model')
const Baby = require('../models/baby.model')
const InTraining = require('../models/in-training.model')
const Rookie = require('../models/rookie.model')
const Champion = require('../models/champion.model')
const Ultimate = require('../models/ultimate.model')
const Mega = require('../models/mega.model')

function saveDigimon(digimon) {
    return new Promise((resolve, reject) => {

        const phase = digimon.phase

        switch (phase) {
            case 'Egg':
                egg = new Egg({
                    name: digimon.name
                })

                egg.save()
                    .then(egg => {
                        resolve(egg)
                    })
                    .catch(err => {
                        reject(err)
                    })
                break;
            case 'Baby':
                baby = new Baby({
                    name: digimon.name
                })

                baby.save()
                    .then(baby => {
                        resolve(baby)
                    })
                    .catch(err => {
                        reject(err)
                    })
                break;
            case 'In Training':
                inTraining = new InTraining({
                    name: digimon.name
                })

                inTraining.save()
                    .then(inTraining => {
                        resolve(inTraining)
                    })
                    .catch(err => {
                        reject(err)
                    })
                break;
            case 'Rookie':
                rookie = new Rookie({
                    name: digimon.name
                })

                rookie.save()
                    .then(rookie => {
                        resolve(rookie)
                    })
                    .catch(err => {
                        reject(err)
                    })
                break;
            case 'Champion':
                champion = new Champion({
                    name: digimon.name
                })

                champion.save()
                    .then(champion => {
                        resolve(champion)
                    })
                    .catch(err => {
                        reject(err)
                    })
                break;
            case 'Ultimate':
                ultimate = new Ultimate({
                    name: digimon.name
                })

                ultimate.save()
                    .then(ultimate => {
                        resolve(ultimate)
                    })
                    .catch(err => {
                        reject(err)
                    })
                break;
            case 'Mega':
                mega = new Mega({
                    name: digimon.name
                })

                mega.save()
                    .then(mega => {
                        resolve(mega)
                    })
                    .catch(err => {
                        reject(err)
                    })
                break;
        }
    })

}

async function processArray(array) {
    try {
        for (const digimon of array) {
            await saveDigimon(digimon)

        }
        return 'All digimon added'
    } catch (e) {
        throw new Error(e.message)
    }

}



const repository = {
    saveAll: (digimonList) => {
        return new Promise((resolve, reject) => {



            processArray(digimonList)
                .then(result => {
                    resolve(result)
                })
                .catch(err => {
                    console.log(err)
                    reject(err)
                })
        })




    }
}



module.exports = repository