const express = require("express");
const router = express.Router();
const https = require("https");
const bodyParser = require("body-parser");
const axios = require('axios');
const Chart = require('chart.js');
const request = require('request');
const { isAuthenticated } = require("../config/auth");


const jsdom = require('jsdom')
const dom = new jsdom.JSDOM(``)
const $ = require('jquery')(dom.window)



const bitcoin = "Qwsogvtv82FCd"
  var uuid = bitcoin;
  var time = "24h";
  let myChart;
  // getCoinData(uuid, time);
// async function getCoinData(currency, timeframe) {
//       console.log("getCoinData Success");
//       var baseUrl = "https://api.coinranking.com/v2/coin/" + currency + "?timePeriod=" + timeframe;
//       //  var proxyUrl = "https://cors.bridged.cc//";
//       var apiKey = "coinrankingc0b595008db85657a50d4082f20ff1ab68d03f2b78445fb8"
     
//       response = await axios.get(`${baseUrl}`, {
//           method:'GET',
//           headers: {
//               'Content-Type': 'application/json',
//               'x-access-token': `${apiKey}`,
//               'Access-Control-Allow-Origin': "*"
//           }
//       })
//           .then((response) => {
//             console.log(response.data.data);
//               if (response.ok) {
//                   response.json().then((json) => {
//                       console.log("getCoinDataResponse Success");
//                       handlerFunction(json.data);
//                   })
//               }
//           })
//   }
//   function handlerFunction(data) {
//     console.log(data);
//     if (myChart) {
//         console.log("destroying old chart.");
//         myChart.destroy();
        
        
        

//     }
//     let coinsData = data.coin;
//     var ctx = document.getElementById('coinchart')
//     myChart = new Chart(ctx, {
//         type: 'line',
//         data: {
//             labels: ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
//             datasets: [{
//                 data: coinsData.sparkline,
//                 label: coinsData.symbol,
//                 lineTension: 0,
//                 backgroundColor: 'transparent',
//                 borderColor: coinsData.color,
//                 borderWidth: 4,
//                 pointBackgroundColor: coinsData.color,
//             },
//             ]
//         },
//         options: {
//             scales: {
//                 yAxes: [{
//                     ticks: {
//                         beginAtZero: false,
//                         callback: function (value, index, values) {
//                             return '$' + value;
//                         }
//                     }
//                 }]
//             },
//             legend: {
//                 display: true,
//             }
//         }
//     })
// }





router.get("/:name",isAuthenticated,async(req, res) => {
    const slug=  req.params.name.toLowerCase();

    const info1=await getinfo(slug)
    
    const info2=await getinfo2(slug)
    

      res.render("coin",{info:info1[Object.keys(info1)[0]],info2:info2,name:req.user.firstname});
  });
  
 
async function getinfo(slug) {

    try{
        let response = null;
        
    response = await axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/info?slug='+slug+'', {
      headers: {
        'X-CMC_PRO_API_KEY': '7ecfe0c1-46a6-48fd-bc89-bfd710ee81ad',
      },
    });
if (response) {
    // success
    console.log(response.data.data);
    return response.data.data;
     
     
    
  }
}catch (err) {
    console.log(err);
  }


}
  
async function getinfo2(slug) {
const info2={
  
  maxsupply:0,
  totalsupply:0,
  circulatingsupply:0,
  market_cap:0,
  volume_24h:0,
  class1:0,
  class2:0,
  fully_diluted_market_cap:0,
  percent_change_24h:0,
  price:0,
  cmc_rank:0
}
    try{
        let response = null;
        
    response = await axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?slug='+slug+'', {
      headers: {
        'X-CMC_PRO_API_KEY': '7ecfe0c1-46a6-48fd-bc89-bfd710ee81ad',
      },
    });
if (response) {
      



info2.maxsupply=financial(response.data.data[Object.keys(response.data.data)[0]].max_supply,0)
info2.circulatingsupply=financial(response.data.data[Object.keys(response.data.data)[0]].circulating_supply,0)
const pr=response.data.data[Object.keys(response.data.data)[0]].quote.USD.price

if(pr>100){info2.price=financial(response.data.data[Object.keys(response.data.data)[0]].quote.USD.price,2)
}else if(pr>1){info2.price=financial(response.data.data[Object.keys(response.data.data)[0]].quote.USD.price,5)
}else if(pr<1){info2.price=financial(response.data.data[Object.keys(response.data.data)[0]].quote.USD.price,9)}
const vl=response.data.data[Object.keys(response.data.data)[0]].quote.USD.percent_change_24h
console.log(vl);
if(vl<0){
  info2.class1='fa fa-caret-down'
  info2.class2='redc' 
  
}else{info2.class1='fa fa-caret-up'
      info2.class2='greenc' }
info2.volume_24h=financial(response.data.data[Object.keys(response.data.data)[0]].quote.USD.volume_24h,2)
info2.totalsupply=financial(response.data.data[Object.keys(response.data.data)[0]].total_supply,0)
info2.percent_change_24h=financial(response.data.data[Object.keys(response.data.data)[0]].quote.USD.percent_change_24h,2)
info2.market_cap=financial(response.data.data[Object.keys(response.data.data)[0]].quote.USD.market_cap,2)
info2.fully_diluted_market_cap=financial(response.data.data[Object.keys(response.data.data)[0]].quote.USD.fully_diluted_market_cap,2)
info2.cmc_rank=response.data.data[Object.keys(response.data.data)[0]].cmc_rank

    
 
     
    
  }
}catch (err) {
    console.log(err);
  }

return info2
}
   

function financial(x,y) {
  return Number.parseFloat(x).toFixed(y);
}

 
  // Define currency codes

  

module.exports = router;