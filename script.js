document.addEventListener("DOMContentLoaded", async function () {
    async function getStockRecommendation() {
        try {
            console.log("Fetching AI stock recommendation...");
            const today = new Date().toDateString();

            const response = await fetch("https://api.openai.com/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer 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"
                },
                body: JSON.stringify({
                    model: "gpt-4-turbo",
                    messages: [{ role: "user", content: "Suggest the best stock to invest in today with its ticker symbol, current price, reason for recommendation, and a fun fact about the stock." }],
                    temperature: 0.7,
                    max_tokens: 200
                })
            });

            if (!response.ok) {
                throw new Error(`OpenAI API request failed with status: ${response.status}`);
            }

            const data = await response.json();
            console.log("AI Response:", data);

            if (data.choices && data.choices.length > 0) {
                const stockDetails = data.choices[0].message.content.trim().split(" - ");
                document.getElementById("current-date").textContent = today;
                document.getElementById("stock-symbol").textContent = stockDetails[0] || "N/A";
                document.getElementById("stock-reason").textContent = stockDetails[1] || "No reason provided.";
                document.getElementById("ai-explanation").textContent = stockDetails[2] || "No explanation available.";
                document.getElementById("stock-fun-fact").textContent = stockDetails[3] || "Fun fact not available.";
            } else {
                throw new Error("Invalid AI response format");
            }
        } catch (error) {
            console.error("Error fetching stock recommendation:", error);
            document.getElementById("error-log").textContent = `Error: ${error.message}`;
        }
    }

    getStockRecommendation();
});
