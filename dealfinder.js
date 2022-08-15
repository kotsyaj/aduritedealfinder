// $.ajax({ url: '/api/get-items-onsite', type: 'post', headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')}, success: function (data) {console.log(data)}});

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
    }).catch(err=>{
        console.error(`${err.toString().toLowerCase()}`);
    });
};

async function getDeals(rate) {
    await getRoliApi(); var bruh = "";
    for (const i in adurdata.items.items) {
        var itemRate = Number(adurdata.items.items[i].price / (rolidata.items[adurdata.items.items[i].limited_id][4] / 1000)).toFixed(2);
        if (itemRate <= rate) {
            bruh += `${adurdata.items.items[i].limited_name} | $${adurdata.items.items[i].price} | ${(rolidata.items[adurdata.items.items[i].limited_id][4] / 1000).toFixed(1)}K | ${itemRate}\n`;
        };
    };
    bruh += `Generated at ${getTimeStamp()} thanks to kotsyaj#6046`
    fs.writeFile('./dealfinder.txt', bruh, function (error, data) {
        if (error) {
            console.log(error)
        }
    });
};

getDeals(2);
