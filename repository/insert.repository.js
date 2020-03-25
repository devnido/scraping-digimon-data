const Egg = require('../models/egg.model')
const Baby = require('../models/baby.model')
const InTraining = require('../models/in-training.model')
const Rookie = require('../models/rookie.model')
const Champion = require('../models/champion.model')
const Ultimate = require('../models/ultimate.model')
const Mega = require('../models/mega.model')



const repository = {

    saveAll: async(digimonList) => {

        for (const digimon of array) {
            await saveDigimon(digimon)
        }
        return 'All digimons saved'
    }

}


module.exports = repository


function saveDigimon(digimon) {

    const phase = digimon.phase

    switch (phase) {
        case 'Egg':
            return Egg.create({
                name: digimon.name
            })

            break;
        case 'Baby':
            return Baby.create({
                name: digimon.name
            })

            break;
        case 'In Training':
            return InTraining.create({
                name: digimon.name
            })

            break;
        case 'Rookie':
            return Rookie.create({
                name: digimon.name
            })

            break;
        case 'Champion':
            return Champion.create({
                name: digimon.name
            })

            break;
        case 'Ultimate':
            return Ultimate.create({
                name: digimon.name
            })

            break;
        case 'Mega':
            return Mega.create({
                name: digimon.name
            })

            break;
    }


}