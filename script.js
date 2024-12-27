var tickers = JSON.parse(localStorage.getItem('tickers')) || [];
var lastPrices = {};
var counter = 15;

function startUpdateCycle() {
    updatePrices();
    var countdown = setInterval(function() {
        counter--;
        $('#counter').text(counter);
        if (counter <= 0) {
            updatePrices();
            counter = 15;
        }
    }, 1000); // Corrected the placement of the timeout
}

$(document).ready(function() {
    tickers.forEach(function(ticker) {  // Corrected the function syntax
        addTickerToGrid(ticker);  // Corrected the function call
    });
    updatePrices();
    $('#add-ticker-form').submit(function(e) {
        e.preventDefault();
        var newTicker = $('#new-ticker').val().toUpperCase();  // Corrected `val.toUpperCase()`
        if (!tickers.includes(newTicker)) {  // Corrected `ticcker.includes(newTicker)`
            tickers.push(newTicker);
            localStorage.setItem('tickers', JSON.stringify(tickers));
            addTickerToGrid(newTicker);
        }
        $('#new-ticker').val('');  // Corrected selector
        updatePrices();
    });
    $('#tickers-grid').on('click', '.remove-btn', function() {  // Corrected the selector
        var tickerToRemove = $(this).data('ticker');
        tickers = tickers.filter(t => t !== tickerToRemove);
        localStorage.setItem('tickers', JSON.stringify(tickers));
        $(`#${tickerToRemove}`).remove();  // Corrected the selector syntax
    });
    startUpdateCycle();
});

function addTickerToGrid(ticker) {
    $('#tickers-grid').append(`
        <div id="${ticker}" class="stock-box">
            <h2>${ticker}</h2>
            <p id="${ticker}-price"></p>
            <p id="${ticker}-pct"></p>
            <button class="remove-btn" data-ticker="${ticker}">Remove</button>
        </div>
    `);
}

function updatePrices() {
    tickers.forEach(function(ticker) {  // Corrected `ticcker` to `ticker`
        $.ajax({
            url: 'get_stock_data',
            type: 'POST',
            data: JSON.stringify({'ticker': ticker}),
            contentType: 'application/json; charset=utf-8',  // Fixed charset typo
            dataType: 'json',  // Fixed typo in dataType
            success: function(data) {
                var changePercent = ((data.currentPrice - data.openPrice) / data.openPrice) * 100;
                var colorClass;
                if (changePercent <= -2) {
                    colorClass = 'dark-red';
                } else if (changePercent < 0) {
                    colorClass = 'red';
                } else if (changePercent == 0) {
                    colorClass = 'gray';
                } else if (changePercent <= 2) {
                    colorClass = 'green';
                } else {
                    colorClass = 'dark-green';
                }

                $(`#${ticker}-price`).text(`${data.currentPrice.toFixed(2)}`);  // Fixed string interpolation
                $(`#${ticker}-pct`).text(`${changePercent.toFixed(2)}%`);  // Fixed string interpolation
                $(`#${ticker}-price`).removeClass('dark-red red gray green dark-green').addClass(colorClass);
                $(`#${ticker}-pct`).removeClass('dark-red red gray green dark-green').addClass(colorClass);

                var flashClass;
                if (lastPrices[ticker] > data.currentPrice) {
                    flashClass = 'red-flash';
                } else if (lastPrices[ticker] < data.currentPrice) {
                    flashClass = 'green-flash';
                } else {
                    flashClass = 'gray-flash';
                }
                lastPrices[ticker] = data.currentPrice;
                $(`#${ticker}`).addClass(flashClass);  // Fixed the selector and method
                setTimeout(function() {
                    $(`#${ticker}`).removeClass(flashClass);
                }, 1000);
            }
        });
    });
}




