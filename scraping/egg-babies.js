const cheerio = require('cheerio')

const digimonList = []

const scraping = {
    scraping: (page) => {

        return new Promise((resolve, reject) => {

            const $ = cheerio.load(page);

            // POPULATE :: EGG - BABY - INTRAINING  
            const rowHtmlTable = $('a[id="Baby -> In Training"] < h2 + table.ffaq').find('tbody > tr')

            if (rowHtmlTable.length > 0) {

                rowHtmlTable.each(function (i, o) {

                    const _egg = $(o).find('td:nth-child(1)').html()
                    const _baby = $(o).find('td:nth-child(2)').html()
                    const _inTrainig = $(o).find('td:nth-child(3)').text()

                    digimonList.push({
                        phase: 'Egg',
                        name: _egg,
                        evolvesTo: _baby
                    })
                    digimonList.push({
                        phase: 'Baby',
                        name: _baby,
                        evolvesFrom: _egg,
                        evolvesTo: _inTrainig

                    })

                });

                resolve(digimonList)
            } else {
                reject({
                    ok: 0,
                    message: 'No elements in egg babies scraping'
                })
            }
        })
    }
}

module.exports = scraping