const cheerio = require('cheerio')

toExport = {
    getIndex: (page) => {
        return new Promise((resolve, reject) => {
            let digimonList = []
            getEggsAndBabies(digimonList, page)
                .then(digimonList => {

                    digimonList.sort(sortBabies)

                    return getEveryoneElse(digimonList, page)
                })
                .then(digimonList => {
                    resolve(digimonList)
                })
                .catch(err => {
                    reject(err)
                })

        })

    }
}

const getEggsAndBabies = (digimonList, page) => {

    return new Promise((resolve, reject) => {

        const $ = cheerio.load(page);

        // POPULATE :: EGG - BABY - INTRAINING  
        const rowHtmlTable = $('a[id="Baby -> In Training"] < h2 + table.ffaq').find('tbody > tr')

        if (rowHtmlTable.length > 0) {

            rowHtmlTable.each(function (i, o) {

                const egg = $(o).find('td:nth-child(1)').html()
                const baby = $(o).find('td:nth-child(2)').html()
                //const inTrainig = $(o).find('td:nth-child(3)').text() //In Training

                digimonList.push({
                    phase: 'Egg',
                    phaseTo: 'Baby',
                    name: egg,
                    page: 0
                })

                digimonList.push({
                    phase: 'Baby',
                    phaseTo: 'In Training',
                    name: baby,
                    page: 0
                })

            });

            resolve(digimonList)

        } else {
            reject({
                ok: 0,
                message: 'No elements in table of content get babies'
            })
        }

    })
}

const getEveryoneElse = (digimonList, page) => {

    return new Promise((resolve) => {

        const $ = cheerio.load(page);

        const contents = $('.ftoc > ol > ol')

        if (contents.length > 0) {

            contents.each(function (i, ol) {

                $(ol).find('li').each(function (index, li) {

                    const phaseTransition = $(ol).prev().text()
                    const phase = phaseTransition.includes('->') ? phaseTransition.split('->')[0].trim() : phaseTransition;
                    const phaseTo = phaseTransition.includes('->') ? phaseTransition.split('->')[1].trim() : '';
                    const name = $(li).text()
                    const page = $(li).find('a').attr('href').substr(6, 1)

                    digimonList.push({
                        phase: phase.trim(),
                        phaseTo: phaseTo.trim(),
                        name: name,
                        page: page /* 0 */
                    })
                })
            })

            resolve(digimonList)

        } else {
            reject({
                ok: 0,
                message: 'No elements in table of content get everyone else'
            })
        }
    })
}

function sortBabies(a, b) {

    if (a.phase === 'Egg' && b.phase === 'Baby') {
        return -1
    }
    if (b.phase === 'Egg' && a.phase === 'Baby') {
        return 1
    }

    if (a.phase === 'Egg' && b.phase === 'In Training') {
        return -1
    }
    if (b.phase === 'Egg' && a.phase === 'In Training') {
        return 1
    }

    if (a.phase === 'Baby' && b.phase === 'In Training') {
        return -1
    }
    if (b.phase === 'Baby' && a.phase === 'In Training') {
        return 1
    }

    return 0

}







module.exports = toExport