const cheerio = require('cheerio')

const InTraining = require('../models/in-training.model')
const Rookie = require('../models/rookie.model')
const Champion = require('../models/champion.model')
const Ultimate = require('../models/ultimate.model')
const Mega = require('../models/mega.model')

const scraping = {

    scraping: (digimonList, digimonScrapingData, pages) => {
        return new Promise((resolve, reject) => {

            const digimonWithoutEggsAndBabies = digimonScrapingData.filter(pullEggsAndBabies)
            // for (let i = 0; i < 4; i++) {

            const digimonThisPage = digimonWithoutEggsAndBabies.filter(digimon => digimon.page == 0)

            const $ = cheerio.load(pages[0])

            if (digimonThisPage.length > 0) {

                let count = digimonThisPage.length

                for (digimon of digimonThisPage) {

                    /* Datos digimon */
                    const name = digimon.name
                    const phase = digimon.phase
                    const evolvesFrom = []
                    const evolvesTo = []


                    /* Busqueda con selector */
                    /* selector id digimon */
                    const idSelector = 'a[id="' + digimon.name + '"]'

                    if (phase != 'Mega') {

                        /** evolvesTo table*/
                        let tableRowsEvolvesTo = $(idSelector).parent().next().find('tbody > tr')

                        /** evolvesTo each row without titles*/
                        tableRowsEvolvesTo.each(function (i, o) {
                            if (i > 0) {

                                const td = $(this).find('td')

                                const nameEvolvesTo = $(td[0]).text()
                                const statsEvolvesTo = {
                                    hp: $(td[1]).text(),
                                    mp: $(td[2]).text(),
                                    strength: $(td[3]).text(),
                                    stamina: $(td[4]).text(),
                                    wisdom: $(td[5]).text(),
                                    speed: $(td[6]).text(),
                                    weight: $(td[7]).text(),
                                    mistakes: $(td[8]).text(),
                                    bond: $(td[9]).text(),
                                    discipline: $(td[10]).text(),
                                    wins: $(td[11]).text(),
                                    keyDigimon: $(td[12]).text(),
                                    keyPoints: $(td[13]).text(),
                                }

                                evolvesTo.push({
                                    name: nameEvolvesTo,
                                    stats: statsEvolvesTo
                                })
                            }
                        }) //end each evolvesTo



                        let tableRowsEvolvesFrom = $(idSelector).parent().next().next().find('tbody > tr')

                        tableRowsEvolvesFrom.each(function (i, o) {

                            const td = $(this).find('td')

                            if (i == 0) {

                                const nameEvolvesFrom = $(td[1]).text()
                                evolvesFrom.push(nameEvolvesFrom)
                            } else {
                                const nameEvolvesFrom = $(td[0]).text()
                                evolvesFrom.push(nameEvolvesFrom)
                            }

                        })









                    } else {

                    }








                    if (count--) {
                        resolve('asdasdasdsa')
                    }
                }


            } else {
                reject('No hay elementos')
            }


            // if (i === 3) {
            //     resolve(digimonList)
            // }
            // }
        })
    }
}


function pullEggsAndBabies(digimon) {


    if (digimon.phase == 'Egg') {
        return false
    } else if (digimon.phase == 'Baby') {
        return false
    }
    return true

}

module.exports = scraping