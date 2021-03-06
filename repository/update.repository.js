const setEvolvesRepository = require('./setEvolves.repository')

const repository = {

    setEvolvesFrom: async (digimonList) => {

        try {
            for (const digimon of digimonList) {

                await routeEvolvesFrom(digimon)

            }

            return 'EvolvesFrom updated'
        } catch (error) {
            console.log(error.stack)
            throw new Error(error.message)
        }

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
                        reject('Phase doesnt exist')
                    })
                    break;
            }

        }
    },
    setEvolvesTo: async (digimonList) => {


        try {
            for (const digimon of digimonList) {

                await routeEvolvesTo(digimon)

            }
            return 'EvolvesTo updated'
        } catch (error) {
            console.log(error)
            throw Error(error)
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
                        reject('Phase doesnt exist')
                    })
                    break;
            }

        }
    }
}

module.exports = repository