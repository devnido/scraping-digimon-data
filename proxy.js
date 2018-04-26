const request = require('request')


const URL = 'https://gamefaqs.gamespot.com/ps4/196176-digimon-world-next-order/faqs/74424'
const PAGE = '?page=0'

const proxies = ['http://151.80.140.233:54566', 'http://217.61.107.28:3128', 'http://185.17.122.200:3128', 'http://217.61.104.140:3128']



request({
        url: `${URL}${PAGE}`,
        encoding: 'binary',
        proxy: proxies[0],
        tunnel: true,
        sendImmediately: true,
        followAllRedirects: true
    },
    (err, resp, body) => {
        if (!err && resp.statusCode == 200) {
            console.log(body)

        } else {
            console.log(err)
        }

    })