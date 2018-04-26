const mongoose = require('mongoose')

mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/digimondb')

const database = require('./utils/database')

/* REPOSITORY */
const repository = require('./repository/repository')

/* SCRAPING */
const pageScraping = require('./scraping/get-all-pages')
const tableOfContent = require('./scraping/table-of-content')
const eggsBabies = require('./scraping/egg-babies')
const everyoneElse = require('./scraping/everyone-else')


digimonScrapingData = []

const getPagesPromise = pageScraping.getAllPages()
//const cleanDatabsePromise = database.removeAllDigimon()



Promise.all([getPagesPromise /*cleanDatabsePromise*/ ])
    .then(result => {
        const [pages /*,resultDB*/ ] = result

        tableOfContent.scraping(pages[0])
            .then(digimonData => {
                digimonScrapingData = digimonData

                //     return repository.saveAll(digimonData)
                // })
                // .then(result => {

                return eggsBabies.scraping(pages[0])
            })
            .then(digimonList => {

                return everyoneElse.scraping(digimonList, digimonScrapingData, pages)
            })
            .then(digimonList => {
                console.log(digimonList)
                mongoose.connection.close()
                //digimonList.map(digimon => console.log(digimon.name))
                //return repository.relationAll(digimonList)
            })
            // .then(result => {

            //     mongoose.connection.close()
            // })
            .catch(err => {
                console.log(err)
            })
    })

    .catch(err => {

        console.log(err)
        mongoose.connection.close()
    })