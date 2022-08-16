// $.ajax({ url: '/api/get-items-onsite', type: 'post', headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')}, success: function (data) {console.log(data)}});
// doesnt filter the results and uses rolimons value instead of rap

axios = require('axios');
fs = require('fs');

var adurdata = require('./items.json');
var rolidata = [];

function getTimeStamp() {
    var timestamp = new Date(Date.now()).toISOString();
    return `${timestamp}`;
};

async function getRoliApi() { 
    await axios.get('https://www.rolimons.com/itemapi/itemdetails').then(res=>{
        rolidata = res.data;
    }).catch(err => {
        console.error(err);
    });
};

async function getDeals(rate, minprice, maxprice) {
    await getRoliApi(); var bruh = "";
    for (const i in adurdata.items.items) {
        var itemRate = Number(adurdata.items.items[i].price / (rolidata.items[adurdata.items.items[i].limited_id][4] / 1000)).toFixed(2);
        if (itemRate <= rate && adurdata.items.items[i].price > minprice && adurdata.items.items[i].price < maxprice) {
            bruh += `${adurdata.items.items[i].limited_name} | $${adurdata.items.items[i].price} | ${(rolidata.items[adurdata.items.items[i].limited_id][4] / 1000).toFixed(1)}K | ${itemRate}/1\n`;
        };
    };
    bruh += `Generated by aduritesexbot69 at ${getTimeStamp()}\nSettings: max rate: ${rate}/1 min price: $${minprice} max price: $${maxprice}`
    fs.writeFile('./dealfinder.txt', bruh, function (error) {
        if (error) {
            console.log(error);
        };
    });
};

getDeals(2, 0, 99999);
