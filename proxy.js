const request = require('request')
const cheerio = require('cheerio')


const URL = 'https://gamefaqs.gamespot.com/ps4/196176-digimon-world-next-order/faqs/74424'
const PAGE = '?page=0'

const proxies = ['http://52.229.52.86:3128', 'http://52.164.249.198:3128', 'http://145.249.106.107:8118', 'http://104.46.34.250:3128']


async function getRequest(proxy) {
    return new Promise((resolve, reject) => {
        request({
                url: `${URL}${PAGE}`,
                encoding: 'binary',
                proxy: proxy,
                tunnel: true,
                sendImmediately: true,
                followAllRedirects: true
            },
            (err, resp, body) => {
                if (!err && resp.statusCode == 200) {

                    const $ = cheerio.load(body)

                    if ($('a[href="/ps4/196176-digimon-world-next-order"]').length > 0) {

                        resolve($('a[href="/ps4/196176-digimon-world-next-order"]').text())

                    } else {
                        reject({
                            ok: 0,
                            message: 'Bad request ' + proxy

                        })
                    }

                } else {
                    console.log(err)
                }

            })
    })

}

(async function () {
    for (const proxy of proxies) {
        const result = await getRequest(proxy)
        console.log(result)
    }
})()