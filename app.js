const mongoose = require('mongoose')

mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/digimondb')

const database = require('./utils/database')

/* REPOSITORY */
const insertRepository = require('./repository/insert.repository')
const updateRepository = require('./repository/update.repository')

/* SCRAPING */
const pageScraping = require('./scraping/get-all-pages')
const scrapingTableOfContent = require('./scraping/table-of-content')
const scrapingEggsBabies = require('./scraping/egg-babies')
const scrapingEveryoneElse = require('./scraping/everyone-else')

digimonIndexList = []

const getPagesPromise = pageScraping.getAllPages()
const cleanDatabsePromise = database.removeAllDigimon()

Promise.all([getPagesPromise, cleanDatabsePromise])
    .then(result => {

        const [pages, resultDB] = result

        scrapingTableOfContent.getIndex(pages[0])
            .then(result => {

                digimonIndexList = result /* {phase, phaseTo, name, page} */

                return insertRepository.saveAll(digimonIndexList)
            })
            .then(result => {

                console.log(result)

                return scrapingEggsBabies.get(pages[0])
            })
            .then(result => {

                const [digimonEvolvesFromList, digimonEvolvesToList] = result
                /** {phase,digimon,evolvesFrom,statsEvolvesFrom} - {phase,digimon,evolvesTo,statsEvolvesTo} */

                return scrapingEveryoneElse.get(digimonEvolvesFromList, digimonEvolvesToList, digimonIndexList, pages)
            })
            .then(result => {
                // console.log(result)
                const [digimonEvolvesFromList, digimonEvolvesToList] = result

                return updateRepository.setEvolvesTo(digimonEvolvesToList)
            })
            .then(result => {
                console.log(result)

                return updateRepository.setEvolvesFrom(digimonEvolvesFromList)
            })
            .then(result => {
                console.log(result)
            })
            .catch(err => {
                console.log(err)
            })
    })
    .then(result => {
        mongoose.connection.close()
    })
    .catch(err => {
        console.log(err)
        mongoose.connection.close()
    })