
const express = require("express");
const axios = require('axios');
const cheerio = require('cheerio')
const router = express.Router();


 const { isAuthenticated } = require("../config/auth");


 router.get("/trending-cryptocurrencies",isAuthenticated,async(req, res) => {
  const coinAr = await getPriceFeed1()
  res.render("trending",{coin1:coinAr,name: req.user.firstname})
 })
 router.get("/most-visited",isAuthenticated,async(req, res) => {
  const coinAr = await getPriceFeed2()
  res.render("most",{coin1:coinAr,name: req.user.firstname})
 })
 router.get("/gains&losers",isAuthenticated,async(req, res) => {
  const coinAr = await getPriceFeed3()
  res.render("gainandloser",{coin1:coinAr,name: req.user.firstname})
 })
 router.get("/new",isAuthenticated,async(req, res) => {
  const coinAr = await getPriceFeed4()
  res.render("new",{coin1:coinAr,name: req.user.firstname})
 })

router.get("/",isAuthenticated,async(req, res) => {
     const coinAr = await getPriceFeed()
  
     const coinArr = await get()
    
    res.render("dash",{coin1:coinArr,coin2:coinAr, name: req.user.firstname });
  });
  
  
 
  
  
  
  
  
  //SCRAPPING FUNCTIONS for tables
  
    async function get() {
      try {
    
    
        const { data } = await axios({
          method: "GET",
          url: 'https://coinmarketcap.com/',
        })
    
        const $ = cheerio.load(data)
        const elemSelector = '#__next > div > div.main-content > div.sc-57oli2-0.comDeo.cmc-body-wrapper > div > div > div.sc-1rmt1nr-0.sc-1rmt1nr-2.iMyvIy > div > div.eQRTPY'
        const keys = [
    
          'rank',
          'imgsrc',
          'name',
          'sym',
          'pricechange',
    
        ]
        const coinArr = []
    
        $(elemSelector).each((parentIDx, parentElem) => {
    
          let keyIdx = 0
          const coinobj = {}
    
    
    
          if (parentIDx <= 8) {
            $(parentElem).children().each((childIdx, childElem) => {
    
              let tdvalue = $(childElem).text();
    
    
              if (keyIdx === 0) {
    
                tdvalue = $('.rank', $(childElem).html()).text(),
                  coinobj[keys[keyIdx]] = tdvalue
                keyIdx++
    
                tdvalue = $('.eQRTPY .coin-logo ').get().map(img => $(img).attr('src'))[parentIDx]
                coinobj[keys[keyIdx]] = tdvalue
                keyIdx++
    
                tdvalue = $('.dNOTPP', $(childElem).html()).text(),
                  coinobj[keys[keyIdx]] = tdvalue
                keyIdx++
                tdvalue = $('.alias', $(childElem).html()).text(),
                  coinobj[keys[keyIdx]] = tdvalue
    
    
              }
    
              if (tdvalue) {
    
                coinobj[keys[keyIdx]] = tdvalue
                keyIdx++
              }
    
    
            })
            coinArr.push(coinobj)
    
          }
    
    
    
        })
    
    
        
        return coinArr
    
    
      } catch (err) {
        console.log(err);
      }
    
    }
   
    async function getPriceFeed() {
      try {
    
        const { data } = await axios({
          method: "GET",
          url: 'https://coinmarketcap.com/',
        })
        const $ = cheerio.load(data)
        
        const elemSelector = ' #__next > div > div.main-content > div.sc-57oli2-0.comDeo.cmc-body-wrapper > div > div > div.h7vnx2-1.bFzXgL > table > tbody > tr'
        
                              
    
        
        const keys = [
    
          'rank',
          'name',
          'sym',
          'imgsrc',
          'price',
          'h',
          'd',
          'marketCap',
          'marketcap',
          'volume',
          'Volume',
          'circulatungsupply',
          'last7days'
        ]
        const coinAr = []
    
       $(elemSelector).each((parentIDx, parentElem) => {
    
          let keyIdx = 0;
          
          let coinobj = {};
    
    
    
    
    
          $(parentElem).children().each((childIdx, childElem) => {
    
            if (childIdx === 1) {
              tdvalue = $('p ', $(childElem).html()).text();
              coinobj[keys[keyIdx]] = tdvalue;
              keyIdx++;
              
            }
            if (childIdx === 2) {
              tdvalue = $('p:first-child ', $(childElem).html()).text();
              coinobj[keys[keyIdx]] = tdvalue;
              keyIdx++;
    
              tdvalue = $('p:nth-child(2) ', $(childElem).html()).text();
              coinobj[keys[keyIdx]] = tdvalue;
              keyIdx++;
    
              tdvalue = $('.escjiH .dBKWCw .coin-logo ').get().map(img => $(img).attr('src'))[parentIDx];
              coinobj[keys[keyIdx]] = tdvalue;
              keyIdx++;
    
            }
            if (childIdx === 3) {
              tdvalue = $('span ', $(childElem).html()).text();
              coinobj[keys[keyIdx]] = tdvalue;
              keyIdx++;
    
            }
            if (childIdx === 4) {
              tdvalue = $('span ', $(childElem).html()).text();
              coinobj[keys[keyIdx]] = tdvalue;
              keyIdx++;
    
            }
            if (childIdx === 5) {
              tdvalue = $('span ', $(childElem).html()).text();
              coinobj[keys[keyIdx]] = tdvalue;
              keyIdx++;
    
            }
            if (childIdx === 6) {
              tdvalue = $('span:nth-child(1)  ', $(childElem).html()).text();
              coinobj[keys[keyIdx]] = tdvalue;
              keyIdx++;
    
              tdvalue = $('span:nth-child(2)  ', $(childElem).html()).text();
              coinobj[keys[keyIdx]] = tdvalue;
              keyIdx++;
    
            }
            if (childIdx === 7) {
              tdvalue = $('a   ', $(childElem).html()).text();
              coinobj[keys[keyIdx]] = tdvalue;
              keyIdx++;
    
              tdvalue = $('.cRcnjD :nth-child(2) ', $(childElem).html()).text();
              coinobj[keys[keyIdx]] = tdvalue;
              keyIdx++;
    
            }
            if (childIdx === 8) {
              tdvalue = $('p ', $(childElem).html()).text();
              coinobj[keys[keyIdx]] = tdvalue;
              keyIdx++;
    
    
            }
            if (childIdx === 9) {
              tdvalue = $('.bCltOL ').get().map(img => $(img).attr('src'))[parentIDx];
              coinobj[keys[keyIdx]] = tdvalue;
              keyIdx++;
    
    
            }
    
    
    
    
    
          });
          coinAr.push(coinobj);
    
    
    
    
    
        })
        
        return coinAr
    
      } catch (err) {
        console.log(err);
      }
    }
 
    async function getPriceFeed1() {
      try {
    
        const { data } = await axios({
          method: "GET",
          url: 'https://coinmarketcap.com/trending-cryptocurrencies/',
        })
        const $ = cheerio.load(data)
        
        const elemSelector = '#__next > div > div.main-content > div.sc-57oli2-0.comDeo.cmc-body-wrapper > div > div > div.h7vnx2-1.bFzXgL > table > tbody > tr'
        
                              
    
        
        const keys = [
    
          'rank',
          'name',
          'sym',
          'imgsrc',
          'price',
          'h',
          'd',
          'd1',
          'marketCap',
          'volume',
          'last7days'
        ]
        const coinAr = []
    
       $(elemSelector).each((parentIDx, parentElem) => {
    
          let keyIdx = 0;
          
          let coinobj = {};
   
    
    
    
    
          $(parentElem).children().each((childIdx, childElem) => {
    
            if (childIdx === 1) {
              tdvalue = $('p ', $(childElem).html()).text();
              coinobj[keys[keyIdx]] = tdvalue;
              keyIdx++;
              
            }
            if (childIdx === 2) {
              tdvalue = $('p:first-child ', $(childElem).html()).text();
              
              coinobj[keys[keyIdx]] = tdvalue;
              keyIdx++;
    
              tdvalue = $('p:nth-child(2) ', $(childElem).html()).text();
              
              coinobj[keys[keyIdx]] = tdvalue;
              keyIdx++;
    
              tdvalue = $(' .dBKWCw .coin-logo ').get().map(img => $(img).attr('src'))[parentIDx];
              
              coinobj[keys[keyIdx]] = tdvalue;
              keyIdx++;
    
            }
            if (childIdx === 3) {
              tdvalue = $('span ', $(childElem).html()).text();
             
              coinobj[keys[keyIdx]] = tdvalue;
              keyIdx++;
    
            }
            if (childIdx === 4) {
              tdvalue = $('span ', $(childElem).html()).text();
              
              coinobj[keys[keyIdx]] = tdvalue;
              keyIdx++;
    
            }
            if (childIdx === 5) {
              tdvalue = $('span ', $(childElem).html()).text();
              
              coinobj[keys[keyIdx]] = tdvalue;
              keyIdx++;
    
            }
            if (childIdx === 6) {
              tdvalue = $('span:nth-child(1)  ', $(childElem).html()).text();
              
              coinobj[keys[keyIdx]] = tdvalue;
              keyIdx++;
    
            
    
            }
            if (childIdx === 7) {
              tdvalue = $(childElem).text()
              
              coinobj[keys[keyIdx]] = tdvalue;
              keyIdx++;
    
             
    
            }
            if (childIdx === 8) {
              tdvalue = $(childElem).text()
              
              coinobj[keys[keyIdx]] = tdvalue;
              keyIdx++;
    
    
            }
            if (childIdx === 9) {
              tdvalue = $('.bCltOL ').get().map(img => $(img).attr('src'))[parentIDx];
            
              coinobj[keys[keyIdx]] = tdvalue;
              keyIdx++;
    
    
            }
    
    
    
    
    
          });
          coinAr.push(coinobj);
    
    
    
    
    
        })
        
        return coinAr
    
      } catch (err) {
        console.log(err);
      }
    }
    async function getPriceFeed2() {
      try {
    
        const { data } = await axios({
          method: "GET",
          url: 'https://coinmarketcap.com/most-viewed-pages/',
        })
        const $ = cheerio.load(data)
        
        const elemSelector = '#__next > div > div.main-content > div.sc-57oli2-0.comDeo.cmc-body-wrapper > div > div > div.h7vnx2-1.bFzXgL > table > tbody > tr'
        
                              
    
        
        const keys = [
    
          'rank',
          'name',
          'sym',
          'imgsrc',
          'price',
          'h',
          'd',
          'd1',
          'marketCap',
          'volume',
          'last7days'
        ]
        const coinAr = []
    
       $(elemSelector).each((parentIDx, parentElem) => {
    
          let keyIdx = 0;
          
          let coinobj = {};
   
    
    
    
    
          $(parentElem).children().each((childIdx, childElem) => {
    
            if (childIdx === 1) {
              tdvalue = $('p ', $(childElem).html()).text();
              coinobj[keys[keyIdx]] = tdvalue;
              keyIdx++;
              
            }
            if (childIdx === 2) {
              tdvalue = $('p:first-child ', $(childElem).html()).text();
              
              coinobj[keys[keyIdx]] = tdvalue;
              keyIdx++;
    
              tdvalue = $('p:nth-child(2) ', $(childElem).html()).text();
              
              coinobj[keys[keyIdx]] = tdvalue;
              keyIdx++;
    
              tdvalue = $(' .dBKWCw .coin-logo ').get().map(img => $(img).attr('src'))[parentIDx];
              
              coinobj[keys[keyIdx]] = tdvalue;
              keyIdx++;
    
            }
            if (childIdx === 3) {
              tdvalue = $('span ', $(childElem).html()).text();
             
              coinobj[keys[keyIdx]] = tdvalue;
              keyIdx++;
    
            }
            if (childIdx === 4) {
              tdvalue = $('span ', $(childElem).html()).text();
              
              coinobj[keys[keyIdx]] = tdvalue;
              keyIdx++;
    
            }
            if (childIdx === 5) {
              tdvalue = $('span ', $(childElem).html()).text();
              
              coinobj[keys[keyIdx]] = tdvalue;
              keyIdx++;
    
            }
            if (childIdx === 6) {
              tdvalue = $('span:nth-child(1)  ', $(childElem).html()).text();
              
              coinobj[keys[keyIdx]] = tdvalue;
              keyIdx++;
    
            
    
            }
            if (childIdx === 7) {
              tdvalue = $(childElem).text()
              
              coinobj[keys[keyIdx]] = tdvalue;
              keyIdx++;
    
             
    
            }
            if (childIdx === 8) {
              tdvalue = $(childElem).text()
              
              coinobj[keys[keyIdx]] = tdvalue;
              keyIdx++;
    
    
            }
            if (childIdx === 9) {
              tdvalue = $('.bCltOL ').get().map(img => $(img).attr('src'))[parentIDx];
            
              coinobj[keys[keyIdx]] = tdvalue;
              keyIdx++;
    
    
            }
    
    
    
    
    
          });
          coinAr.push(coinobj);
    
    
    
    
    
        })
        
        return coinAr
    
      } catch (err) {
        console.log(err);
      }
    }

    async function getPriceFeed3() {
      try {
    
        const { data } = await axios({
          method: "GET",
          url: 'https://coinmarketcap.com/gainers-losers/',
        })
        const $ = cheerio.load(data)
        
        const elemSelector = '#__next > div > div.main-content > div.sc-57oli2-0.comDeo.cmc-body-wrapper > div > div.sc-1yw69nc-0.DaVcG.table-wrap > div > div > div > table > tbody > tr'
        
                                       
    
        
        const keys = [
    
          'rank',
          'name',
          'sym',
          'imgsrc',
          'price',
          'h24',
          'volume',
          
        ]
        const coinAr = []
    
       $(elemSelector).each((parentIDx, parentElem) => {
    
          let keyIdx = 0;
          
          let coinobj = {};
   
    
    
    
    
          $(parentElem).children().each((childIdx, childElem) => {
    
            if (childIdx === 0) {
              tdvalue = $('p ', $(childElem).html()).text();
             
              coinobj[keys[keyIdx]] = tdvalue;
              keyIdx++;
              
            }
            if (childIdx === 1) {
              tdvalue = $('p:first-child ', $(childElem).html()).text();
              
              coinobj[keys[keyIdx]] = tdvalue;
              keyIdx++;
    
              tdvalue = $('p:nth-child(2) ', $(childElem).html()).text();
              
              coinobj[keys[keyIdx]] = tdvalue;
              keyIdx++;
    
              tdvalue = $(' .dBKWCw .coin-logo ').get().map(img => $(img).attr('src'))[parentIDx];
             
              coinobj[keys[keyIdx]] = tdvalue;
              keyIdx++;
    
            }
            if (childIdx === 2) {
              tdvalue = $('span ', $(childElem).html()).text();
              
              coinobj[keys[keyIdx]] = tdvalue;
              keyIdx++;
    
            }
            if (childIdx === 3) {
              tdvalue = $('span ', $(childElem).html()).text();
              
              coinobj[keys[keyIdx]] = tdvalue;
              keyIdx++;
    
            }
            if (childIdx === 4) {
              tdvalue = $(childElem).text();
             
              coinobj[keys[keyIdx]] = tdvalue;
              keyIdx++;
    
            }
            
    
          });
          coinAr.push(coinobj);
    
    
    
    
    
        })
       
        return coinAr
    
      } catch (err) {
        console.log(err);
      }
    }
    
    async function getPriceFeed4() {
      try {
    
        const { data } = await axios({
          method: "GET",
          url: 'https://coinmarketcap.com/new/',
        })
        const $ = cheerio.load(data)
        
        const elemSelector = '#__next > div > div.main-content > div.sc-57oli2-0.comDeo.cmc-body-wrapper > div > div.h7vnx2-1.bFzXgL > table > tbody > tr'
        
                              
    
        
        const keys = [
    
          'rank',
          'name',
          'sym',
          'imgsrc',
          'price',
          'h',
          'd',
          'fully',
          'volume',
          'blockchain',
          'bimg',
          'Added'
        ]
        const coinAr = []
    
       $(elemSelector).each((parentIDx, parentElem) => {
    
          let keyIdx = 0;
          
          let coinobj = {};
   
    
    
    
    
          $(parentElem).children().each((childIdx, childElem) => {
    
            if (childIdx === 1) {
              tdvalue = $('p ', $(childElem).html()).text();
              
              coinobj[keys[keyIdx]] = tdvalue;
              keyIdx++;
              
            }
            if (childIdx === 2) {
              tdvalue = $('p:first-child ', $(childElem).html()).text();
              
              coinobj[keys[keyIdx]] = tdvalue;
              keyIdx++;
    
              tdvalue = $('p:nth-child(2) ', $(childElem).html()).text();
              
              coinobj[keys[keyIdx]] = tdvalue;
              keyIdx++;
    
              tdvalue = $(' .dBKWCw .coin-logo ').get().map(img => $(img).attr('src'))[parentIDx];
             
              coinobj[keys[keyIdx]] = tdvalue;
              keyIdx++;
    
            }
            if (childIdx === 3) {
              tdvalue = $('span ', $(childElem).html()).text();
              
              coinobj[keys[keyIdx]] = tdvalue;
              keyIdx++;
    
            }
            if (childIdx === 4) {
              tdvalue = $('span ', $(childElem).html()).text();
             
              coinobj[keys[keyIdx]] = tdvalue;
              keyIdx++;
    
            }
            if (childIdx === 5) {
              tdvalue = $('span ', $(childElem).html()).text();
              
              coinobj[keys[keyIdx]] = tdvalue;
              keyIdx++;
    
            }
            if (childIdx === 6) {
              tdvalue = $(childElem).text();
              
              coinobj[keys[keyIdx]] = tdvalue;
              keyIdx++;
    
            
    
            }
            if (childIdx === 7) {
              tdvalue = $(childElem).text()
          
              coinobj[keys[keyIdx]] = tdvalue;
              keyIdx++;
    
             
    
            }
            if (childIdx === 8) {
              tdvalue = $(childElem).text()
              
              coinobj[keys[keyIdx]] = tdvalue;
              keyIdx++;
              tdvalue = $('#__next > div > div.main-content > div.sc-57oli2-0.comDeo.cmc-body-wrapper > div > div.h7vnx2-1.bFzXgL > table > tbody > tr > td > div > img').get().map(img => $(img).attr('src'))[parentIDx];
              
              coinobj[keys[keyIdx]] = tdvalue;
              keyIdx++;
    
            }
            if (childIdx === 9) {
              tdvalue = $(childElem).text()
             
              coinobj[keys[keyIdx]] = tdvalue;
              keyIdx++;
    
    
            }
    
    
    
    
    
          });
          coinAr.push(coinobj);
    
    
    
    
    
        })
        console.log(coinAr);
        return coinAr
    
      } catch (err) {
        console.log(err);
      }
    }


















    router.get("/logout", (req, res) => {
      req.logout();
      res.redirect("/");
    });


    module.exports = router;