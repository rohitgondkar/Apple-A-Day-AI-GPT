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
                    prompt: "Suggest a trending stock for today with a reason and brief justification.",
                    max_tokens: 100
                })
            });
            const data = await response.json();
            const stockDetails = data.choices[0].text.trim().split(" - ");
            document.getElementById("stock-symbol").textContent = stockDetails[0] || "N/A";
            document.getElementById("stock-price").textContent = "Live data required";
            document.getElementById("stock-reason").textContent = stockDetails[1] || "No reason provided.";
            document.getElementById("ai-explanation").textContent = stockDetails[2] || "No explanation available.";
        } catch (error) {
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
