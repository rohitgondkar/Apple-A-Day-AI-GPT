document.addEventListener("DOMContentLoaded", async function () {
    async function getStockRecommendation() {
        const response = await fetch("https://api.example.com/stockpick");
        const data = await response.json();
        document.getElementById("stock-symbol").textContent = data.symbol;
        document.getElementById("stock-price").textContent = `$${data.price}`;
        document.getElementById("stock-reason").textContent = data.reason;
    }

    document.getElementById("refresh-btn").addEventListener("click", getStockRecommendation);
    getStockRecommendation();
});
