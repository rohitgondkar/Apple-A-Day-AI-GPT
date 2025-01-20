import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: "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"
});

document.addEventListener("DOMContentLoaded", async function () {
    async function getStockRecommendation() {
        try {
            console.log("Fetching AI stock recommendation...");
            const completion = await openai.chat.completions.create({
                model: "gpt-4-turbo",
                messages: [{ role: "user", content: "Suggest a trending stock for today with its ticker symbol, price, and reasoning." }],
                temperature: 0.7,
                max_tokens: 2000
            });

            const stockDetails = completion.choices[0].message.content.trim().split(" - ");
            document.getElementById("stock-symbol").textContent = stockDetails[0] || "N/A";
            document.getElementById("stock-reason").textContent = stockDetails[1] || "No reason provided.";
            document.getElementById("ai-explanation").textContent = stockDetails[2] || "No explanation available.";
        } catch (error) {
            console.error("Error fetching stock recommendation:", error);
            document.getElementById("error-log").textContent = `Error: ${error.message}`;
        }
    }

    getStockRecommendation();
});
