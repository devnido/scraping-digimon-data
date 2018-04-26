const Egg = require('../models/egg.model')
const Baby = require('../models/baby.model')
const InTraining = require('../models/in-training.model')
const Rookie = require('../models/rookie.model')
const Champion = require('../models/champion.model')
const Ultimate = require('../models/ultimate.model')
const Mega = require('../models/mega.model')



const util = {
    removeAllDigimon: () => {

        return new Promise((resolve, reject) => {

            const eggs = Egg.remove({})
            const babies = Baby.remove({})
            const inTraining = InTraining.remove({})
            const rookies = Rookie.remove({})
            const champions = Champion.remove({})
            const ultimates = Ultimate.remove({})
            const megas = Mega.remove({})

            Promise.all([eggs, babies, inTraining, rookies, champions, ultimates, megas])
                .then(results => {
                    console.log(results)
                    resolve(results)
                })
                .catch(err => {
                    reject(err)
                })
        })

    }
}

module.exports = util