currency.addEventListener("change", function() {
var XHR = new XMLHttpRequest();
var currencyRates = {};
var ARR_currencyRates = [];
var dates = [];
var nStartDate = parseInt(startDate.value);
var nEndDate = parseInt(endDate.value);

for (i = nStartDate ; i <= nEndDate; i++){
  var URI = `https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?valcode=${currency.value}&date=${i}json`
  XHR.open("GET", URI, false);
  XHR.send();
  XHR.addEventListener("readystatechange", function() {
          if ((XHR.readyState === 4) && (XHR.status === 200)) {
          var data =JSON.parse(XHR.responseText);
          currencyRates[i] = (data[0].rate);
         }
       }, false);
    }
    //hash into array
    for (var key in currencyRates) {
        ARR_currencyRates.push(parse.Float(currencyRates[key].toFixed(2)));
        dates.push(key)
        }
    
        //Graphics
        Highcharts.chart('main', {
        chart: {
            type: 'line'
        },
        title: {
            text: 'exchange Rate'
        },
        subtitle: {
            text: 'Source: bank.gov.ua'
        },
        xAxis: {
            categories: dates
        },
        yAxis: {
            title: {
                text: 'Rate in UAH'
            }
        },
        plotOptions: {
            line: {
                dataLabels: {
                    enabled: true
                },
                enableMouseTracking: false
            }
        },
        series: [{
            name: currency.value,
            data: ARR_currencyRates
        }]
    });    

}, false);