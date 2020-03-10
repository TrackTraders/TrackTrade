console.log('yesss')
const fetch = require('node-fetch');

function getInfo(){
    return fetch('https://fcsapi.com/api-v2/forex/latest?symbol=EUR/USD,USD/JPY,USD/CAD,GBP/CHF&access_key=pow4KFjFX5ReMfnuEspc1coGDqgPoh7ioddFWCbWVgKFqt')
    .then(data=>data.json())
    .then(res=> {
        return res.response
    })
}

module.exports = getInfo;