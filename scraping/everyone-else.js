const cheerio = require('cheerio')

const InTraining = require('../models/in-training.model')
const Rookie = require('../models/rookie.model')
const Champion = require('../models/champion.model')
const Ultimate = require('../models/ultimate.model')
const Mega = require('../models/mega.model')



const scraping = {

    get: (digimonEvolvesFromList, digimonEvolvesToList, digimonIndexList, pages) => {
        return new Promise((resolve, reject) => {

            const digimonWithoutEggsAndBabies = digimonIndexList.filter(pullEggsAndBabies)

            for (let i = 0; i < 4; i++) {

                const digimonsInThisPage = digimonWithoutEggsAndBabies.filter(digimon => digimon.page == i)

                const $ = cheerio.load(pages[i])

                if (digimonsInThisPage.length > 0) { /** {phase, phaseTo, name, page} */

                    let count = digimonsInThisPage.length

                    for (digimon of digimonsInThisPage) {

                        /** Datos digimon */
                        const name = digimon.name
                        const phase = digimon.phase
                        const phaseTo = digimon.phaseTo


                        /** Busqueda con selector */
                        /** selector id digimon   */
                        const idSelector = 'a[id="' + name + '"]'

                        if (phase != 'Mega') {

                            /** evolvesTo table*/
                            let tableRowsEvolvesTo = $(idSelector).parent().next().find('tbody > tr')

                            /** evolvesTo each row without titles*/
                            tableRowsEvolvesTo.each(function (i, o) {
                                if (i > 0) {

                                    const td = $(this).find('td')

                                    let nameEvolvesTo = $(td[0]).text()

                                    if (nameEvolvesTo.indexOf('*')) {
                                        nameEvolvesTo = nameEvolvesTo.replace('*', '')
                                    }

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

                                    digimonEvolvesToList.push({
                                        phase: phase,
                                        digimon: name,
                                        evolvesTo: nameEvolvesTo,
                                        statsTo: statsEvolvesTo
                                    })

                                    digimonEvolvesFromList.push({
                                        phase: phaseTo,
                                        digimon: nameEvolvesTo,
                                        evolvesFrom: name,
                                        statsFrom: statsEvolvesTo
                                    })

                                }




                            }) //end each evolvesTo



                        } //end if !mega



                    } //end for of digimons pages
                } else {
                    reject('No elements in everyone else scraping')
                }


                if (i === 3) {
                    resolve([digimonEvolvesFromList, digimonEvolvesToList])
                }


            }
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