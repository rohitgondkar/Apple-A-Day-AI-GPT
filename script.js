document.addEventListener("DOMContentLoaded", async function () {
    async function getStockRecommendation() {
        // Mock API response (replace with real API)
        const mockData = { symbol: "AAPL", price: "189.45", reason: "Strong earnings & AI growth" };
        
        document.getElementById("stock-symbol").textContent = mockData.symbol;
        document.getElementById("stock-price").textContent = `$${mockData.price}`;
        document.getElementById("stock-reason").textContent = mockData.reason;
    }
    
    document.getElementById("refresh-btn").addEventListener("click", getStockRecommendation);
    getStockRecommendation();
});
