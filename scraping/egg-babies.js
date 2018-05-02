const cheerio = require('cheerio')

const digimonEvolvesFromList = []
const digimonEvolvesToList = []

const scraping = {
    get: (page) => {

        return new Promise((resolve, reject) => {

            const $ = cheerio.load(page);

            // POPULATE :: EGG - BABY - INTRAINING  
            const rowHtmlTable = $('a[id="Baby -> In Training"] < h2 + table.ffaq').find('tbody > tr')

            if (rowHtmlTable.length > 0) {

                rowHtmlTable.each(function (i, o) {

                    const _egg = $(o).find('td:nth-child(1)').html()
                    const _baby = $(o).find('td:nth-child(2)').html()
                    const _inTrainig = $(o).find('td:nth-child(3)').text()

                    digimonEvolvesToList.push({
                        phase: 'Egg',
                        digimon: _egg,
                        evolvesTo: _baby
                    })

                    digimonEvolvesFromList.push({
                        phase: 'Baby',
                        digimon: _baby,
                        evolvesFrom: _egg
                    })

                    digimonEvolvesToList.push({
                        phase: 'Baby',
                        digimon: _baby,
                        evolvesTo: _inTrainig
                    })

                    digimonEvolvesFromList.push({
                        phase: 'In Training',
                        digimon: _inTrainig,
                        evolvesFrom: _baby
                    })



                });

                resolve([digimonEvolvesFromList, digimonEvolvesToList])
            } else {
                reject('No elements in egg babies scraping')
            }
        })
    }
}

module.exports = scraping