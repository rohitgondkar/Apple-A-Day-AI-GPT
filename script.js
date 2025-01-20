document.addEventListener("DOMContentLoaded", async function () {
    async function getStockRecommendation() {
        try {
            const response = await fetch("https://api.openai.com/v1/completions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer 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"
                },
                body: JSON.stringify({
                    model: "gpt-4",
                    prompt: "Suggest a trending stock for today with its ticker symbol, current price, reason for the recommendation, and a brief AI-based justification.",
                    max_tokens: 150
                })
            });

            const data = await response.json();
            if (data.choices && data.choices.length > 0) {
                const stockDetails = data.choices[0].text.trim().split(" - ");
                const stockSymbol = stockDetails[0] || "AAPL"; // Default to AAPL if AI fails
                document.getElementById("stock-symbol").textContent = stockSymbol;
                document.getElementById("stock-reason").textContent = stockDetails[1] || "No reason provided.";
                document.getElementById("ai-explanation").textContent = stockDetails[2] || "No explanation available.";

                // Fetch real-time stock price from Finnhub
                const stockResponse = await fetch(`https://finnhub.io/api/v1/quote?symbol=${stockSymbol}&token=cu26d8pr01ql7sc76tm0cu26d8pr01ql7sc76tmg`);
                const stockData = await stockResponse.json();
                document.getElementById("stock-price").textContent = `$${stockData.c || "0.00"}`;

                // Render stock price chart
                renderStockChart(stockSymbol);
            } else {
                throw new Error("Invalid AI response format");
            }
        } catch (error) {
            console.error("Error fetching stock recommendation:", error);
            document.getElementById("stock-symbol").textContent = "N/A";
            document.getElementById("stock-price").textContent = "$0.00";
            document.getElementById("stock-reason").textContent = "Error fetching data.";
            document.getElementById("ai-explanation").textContent = "Error fetching explanation.";
        }
    }

    async function renderStockChart(stockSymbol) {
        const response = await fetch(`https://finnhub.io/api/v1/stock/candle?symbol=${stockSymbol}&resolution=D&count=5&token=cu26d8pr01ql7sc76tm0cu26d8pr01ql7sc76tmg`);
        const data = await response.json();

        if (data.s !== "ok") {
            console.error("Error fetching stock chart data");
            return;
        }

        const ctx = document.getElementById('stockChart').getContext('2d');
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5"],
                datasets: [{
                    label: `${stockSymbol} Price Trend`,
                    data: data.c,
                    borderColor: 'red',
                    backgroundColor: 'rgba(255, 0, 0, 0.1)',
                    fill: true
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: false
                    }
                }
            }
        });
    }

    getStockRecommendation();
});
