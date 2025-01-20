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
                    prompt: "Suggest a trending stock for today with its current price, reason for the recommendation, and a brief AI-based justification.",
                    max_tokens: 150
                })
            });
            const data = await response.json();
            if (data.choices && data.choices.length > 0) {
                const stockDetails = data.choices[0].text.trim().split(" - ");
                document.getElementById("stock-symbol").textContent = stockDetails[0] || "N/A";
                document.getElementById("stock-price").textContent = stockDetails[1] || "$0.00";
                document.getElementById("stock-reason").textContent = stockDetails[2] || "No reason provided.";
                document.getElementById("ai-explanation").textContent = stockDetails[3] || "No explanation available.";
            } else {
                throw new Error("Invalid response format");
            }
        } catch (error) {
            console.error("Error fetching stock recommendation:", error);
            document.getElementById("stock-symbol").textContent = "N/A";
            document.getElementById("stock-price").textContent = "$0.00";
            document.getElementById("stock-reason").textContent = "Error fetching data.";
            document.getElementById("ai-explanation").textContent = "Error fetching explanation.";
        }
    }
    getStockRecommendation();

    async function renderStockChart() {
        const ctx = document.getElementById('stockChart').getContext('2d');
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5'],
                datasets: [{
                    label: 'Stock Price Trend',
                    data: [150, 155, 160, 158, 162], // Placeholder Data
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
    renderStockChart();
});
