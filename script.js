document.addEventListener("DOMContentLoaded", async function () {
    async function getStockRecommendation() {
        try {
            console.log("Fetching AI stock recommendation...");
            const response = await fetch("https://api.openai.com/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer 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"
                },
                body: JSON.stringify({
                    model: "gpt-4-turbo",
                    messages: [{ role: "system", content: "Suggest a trending stock for today with its current price, reason for the recommendation, and a brief AI-based justification." }],
                    max_tokens: 150
                })
            });

            if (!response.ok) {
                throw new Error(`OpenAI API request failed with status: ${response.status}. Check API key or usage limits.`);
            }

            const data = await response.json();
            console.log("AI Response:", data);

            if (data.choices && data.choices.length > 0) {
                const stockDetails = data.choices[0].message.content.trim().split(" - ");
                const stockSymbol = stockDetails[0] || "AAPL"; // Default to AAPL if AI fails
                document.getElementById("stock-symbol").textContent = stockSymbol;
                document.getElementById("stock-reason").textContent = stockDetails[1] || "No reason provided.";
                document.getElementById("ai-explanation").textContent = stockDetails[2] || "No explanation available.";

                // Fetch real-time stock price from Finnhub
                const stockResponse = await fetch(`https://finnhub.io/api/v1/quote?symbol=${stockSymbol}&token=cu26d8pr01ql7sc76tm0cu26d8pr01ql7sc76tmg`);
                if (!stockResponse.ok) {
                    throw new Error(`Finnhub API request failed with status: ${stockResponse.status}`);
                }
                
                const stockData = await stockResponse.json();
                document.getElementById("stock-price").textContent = `$${stockData.c || "0.00"}`;

                // Render stock price chart
                renderStockChart(stockSymbol);
            } else {
                throw new Error("Invalid AI response format");
            }
        } catch (error) {
            console.error("Error fetching stock recommendation:", error);
            document.getElementById("error-log").textContent = `Error: ${error.message}`;
            document.getElementById("stock-symbol").textContent = "N/A";
            document.getElementById("stock-price").textContent = "$0.00";
            document.getElementById("stock-reason").textContent = "Error fetching data.";
            document.getElementById("ai-explanation").textContent = "Error fetching explanation.";
        }
    }

    async function renderStockChart(stockSymbol) {
        try {
            const response = await fetch(`https://finnhub.io/api/v1/stock/candle?symbol=${stockSymbol}&resolution=D&count=5&token=cu26d8pr01ql7sc76tm0cu26d8pr01ql7sc76tmg`);
            if (!response.ok) {
                throw new Error(`Finnhub stock chart API failed with status: ${response.status}`);
            }
            
            const data = await response.json();

            if (data.s !== "ok") {
                throw new Error("Error fetching stock chart data");
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
        } catch (error) {
            console.error("Error rendering stock chart:", error);
            document.getElementById("error-log").textContent = `Chart Error: ${error.message}`;
        }
    }

    getStockRecommendation();
});
