const request = require('request')
const cheerio = require('cheerio')
const proxies = require('../utils/proxies').get()

const URL = 'https://gamefaqs.gamespot.com/ps4/196176-digimon-world-next-order/faqs/74424'
const PAGE = '?page='

function requestPage(i) {
    return new Promise((resolve, reject) => {
        request({
                url: `${URL}${PAGE}${i}`,
                encoding: 'binary',
                proxy: proxies[i],
                tunnel: true,
                sendImmediately: true,
                followAllRedirects: true
            },
            (err, resp, body) => {
                if (!err && resp.statusCode == 200) {
                    console.log('request', i)
                    const $ = cheerio.load(body)

                    if ($('a[href="/ps4/196176-digimon-world-next-order"]').length > 0) {
                        //resolve($('a[href="/ps4/196176-digimon-world-next-order"]').text())

                        resolve(body)
                    } else {
                        reject({
                            ok: 0,
                            message: 'Bad request ' + i
                        })
                    }


                } else {
                    reject({
                        ok: 0,
                        message: 'Bad request in get all pages ' + i,
                        error: err
                    })
                }

            })
    })
}




const pages = {
    getAllPages: () => {
        return new Promise((resolve, reject) => {
            Promise.all([requestPage(0), requestPage(1), requestPage(2), requestPage(3)])
                .then(results => {
                    resolve(results)
                })
                .catch(err => {
                    reject({
                        ok: 0,
                        message: 'An error has ocurred in get all pages',
                        error: err
                    })
                })
        })
    }
}

module.exports = pages