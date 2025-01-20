document.addEventListener("DOMContentLoaded", async function () {
    async function getStockRecommendation() {
        try {
            const stockSymbols = ["AAPL", "TSLA", "GOOGL", "AMZN", "MSFT"];
            const randomStock = stockSymbols[Math.floor(Math.random() * stockSymbols.length)];
            const response = await fetch(`https://finnhub.io/api/v1/quote?symbol=${randomStock}&token=cu26d8pr01ql7sc76tm0cu26d8pr01ql7sc76tmg`);
            const data = await response.json();
            document.getElementById("stock-symbol").textContent = randomStock;
            document.getElementById("stock-price").textContent = `$${data.c}`;
            document.getElementById("stock-reason").textContent = `${randomStock} is trending based on recent market analysis.`;
        } catch (error) {
            document.getElementById("stock-symbol").textContent = "N/A";
            document.getElementById("stock-price").textContent = "$0.00";
            document.getElementById("stock-reason").textContent = "Error fetching data.";
        }
    }
    getStockRecommendation();
});
