document.addEventListener("DOMContentLoaded", async function () {
    async function getStockPrice(stockSymbol) {
        try {
            console.log(`Fetching stock price for ${stockSymbol}...`);
            const response = await fetch(`https://finnhub.io/api/v1/quote?symbol=${stockSymbol}&token=cu6v2thr01qh2ki6ki00cu6v2thr01qh2ki6ki0g`);

            if (!response.ok) {
                throw new Error(`Finnhub API request failed with status: ${response.status}`);
            }

            const data = await response.json();
            console.log("Finnhub API Response:", data);
            return data.c || "N/A"; // "c" is the current price from Finnhub
        } catch (error) {
            console.error("Error fetching stock price:", error);
            return "N/A";
        }
    }

    async function getStockRecommendation() {
        try {
            console.log("Fetching AI stock recommendation...");
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

            if (!response.ok) {
                throw new Error(`OpenAI API request failed with status: ${response.status}. Check API key or usage limits.`);
            }

            const data = await response.json();
            console.log("AI Response:", data);

            if (data.choices && data.choices.length > 0) {
                const stockDetails = data.choices[0].text.trim().split(" - ");
                const stockSymbol = stockDetails[0] || "N/A";
                document.getElementById("stock-symbol").textContent = stockSymbol;
                document.getElementById("stock-reason").textContent = stockDetails[1] || "No reason provided.";
                document.getElementById("ai-explanation").textContent = stockDetails[2] || "No explanation available.";

                const stockPrice = await getStockPrice(stockSymbol);
                document.getElementById("stock-price").textContent = `$${stockPrice}`;
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

    getStockRecommendation();
});
