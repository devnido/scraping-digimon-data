const setEvolvesRepository = require('./setEvolves.repository')

const repository = {

    setEvolvesFrom: (digimonList) => {

        return new Promise((resolve, reject) => {
            let count = digimonList.length

            for (const digimon of digimonList) {

                routeEvolvesFrom(digimon)
                    .then(result => {
                        if (!count--) {
                            resolve('All digimons have been updated')
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })


            }
        })


        function routeEvolvesFrom({
            phase,
            digimon,
            evolvesFrom,
            statsFrom
        }) {

            switch (phase) {

                case 'Baby':
                    return setEvolvesRepository.setBabyEvolvesFrom(digimon, evolvesFrom)
                    break;
                case 'In Training':
                    return setEvolvesRepository.setInTrainingEvolvesFrom(digimon, evolvesFrom)
                    break;
                case 'Rookie':
                    return setEvolvesRepository.setRookieEvolvesFrom(digimon, evolvesFrom, statsFrom)
                    break;
                case 'Champion':
                    return setEvolvesRepository.setChampionEvolvesFrom(digimon, evolvesFrom, statsFrom)
                    break;
                case 'Ultimate':
                    return setEvolvesRepository.setUltimateEvolvesFrom(digimon, evolvesFrom, statsFrom)
                    break;
                case 'Mega':
                    return setEvolvesRepository.setMegaEvolvesFrom(digimon, evolvesFrom, statsFrom)
                    break;
                default:
                    return new Promise(reject => {
                        reject('Ha ocurrido un error ')
                    })
                    break;
            }

        }
    },
    setEvolvesTo: async (digimonList) => {


        let count = digimonList.length

        for (const digimon of digimonList) {

            const result = await routeEvolvesTo(digimon)


            if (!count--) {
                return 'All digimons have been updated'
            }
        }


        function routeEvolvesTo({
            phase,
            digimon,
            evolvesTo,
            statsTo
        }) {

            switch (phase) {
                case 'Egg':
                    return setEvolvesRepository.setEggEvolvesTo(digimon, evolvesTo)
                    break;
                case 'Baby':
                    return setEvolvesRepository.setBabyEvolvesTo(digimon, evolvesTo)
                    break;
                case 'In Training':
                    return setEvolvesRepository.setInTrainingEvolvesTo(digimon, evolvesTo, statsTo)
                    break;
                case 'Rookie':
                    return setEvolvesRepository.setRookieEvolvesTo(digimon, evolvesTo, statsTo)
                    break;
                case 'Champion':
                    return setEvolvesRepository.setChampionEvolvesTo(digimon, evolvesTo, statsTo)
                    break;
                case 'Ultimate':
                    return setEvolvesRepository.setUltimateEvolvesTo(digimon, evolvesTo, statsTo)
                    break;

                default:
                    return new Promise(reject => {
                        reject('Ha ocurrido un error ')
                    })
                    break;
            }

        }
    }
}

module.exports = repository