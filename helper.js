function initiateUpdateTable(currenciesInOrder,data){
    let currentCurrenyInfo = JSON.parse(data.body);
    if (currenciesInOrder.map((currencyInfo) => currencyInfo[0]).indexOf(currentCurrenyInfo.name) == -1) {
      let _currentCurrencyInfo = objectToArray(currentCurrenyInfo);
      currenciesInOrder.push(_currentCurrencyInfo);
      sortTable(currenciesInOrder);
      drawTable(currenciesInOrder);
    }
    else {
      sortTable(currenciesInOrder,currentCurrenyInfo);
      drawTable(currenciesInOrder);
    }
}

function objectToArray(object) {
    let arr = [];
    if (object instanceof Object) {
        for (key of Object.keys(object)) {
            if (object.hasOwnProperty(key)) arr.push(object[key]);
        }
    }
    else arr = object;
    return arr;
}

function drawTable(currenciesInOrder) {
    let table = document.getElementById('marketprice-container');
    for (let i = 1; i <= currenciesInOrder.length; i++) {
        let row = table.getElementsByTagName("tr")[i];
        if (row == undefined) row = table.insertRow(i);
        for (let j = 0; j < 8; j++) {
            let cell = row.getElementsByTagName("td")[j];
            if (cell == undefined) cell = row.insertCell(j);
            if (j == 7) {
                cell.innerHTML = '';
                let sparkElement = document.createElement('span');
                let sparkline = new Sparkline(sparkElement,
                    {
                        lineColor: "black",
                        startColor: "orange",
                        endColor: "blue",
                        maxColor: "red",
                        minColor: "green",
                        dotRadius: 3,
                        tooltip: function (value, index, array) {
                            return value + ' ' + (30 - (index + 1)) + ' seconds ago';
                        }
                    });
                sparkline.draw(currenciesInOrder[i - 1][j]);
                cell.appendChild(sparkElement);
            }
            else {
                cell.innerHTML = currenciesInOrder[i - 1][j];
            }
        }
    }
}

function sortTable(currenciesInOrder, updateCurrency) {
    if (updateCurrency) {
        let indexToUpdate = currenciesInOrder.map((currency) => currency[0]).indexOf(updateCurrency.name);
        let sparklineData = currenciesInOrder[indexToUpdate][7];
        let _updateCurreny = objectToArray(updateCurrency);
        _updateCurreny.push(sparklineData);
        currenciesInOrder.splice(indexToUpdate, 1, _updateCurreny);
    }
    currenciesInOrder
        .sort(function (a, b) {
            if (a[6] < b[6]) return -1;
            else return 1;
        })
    addSparklineDataToSortedTable(currenciesInOrder);
}

function addSparklineDataToSortedTable(currenciesInOrder) {
    currenciesInOrder.forEach(function (currencyInfo) {
        if (currencyInfo[7] == undefined) currencyInfo[7] = []
        if (currencyInfo[7].length == 30) {
            currencyInfo[7].shift();
        }
        currencyInfo[7].push((currencyInfo[1] + currencyInfo[2]) / 2);
    })
}

module.exports = {
    objectToArray: objectToArray,
    drawTable: drawTable,
    sortTable: sortTable,
    initiateUpdateTable:initiateUpdateTable
};