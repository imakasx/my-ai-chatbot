console.log("This is Ai-chatbot")
const API_KEY = "api-key";

async function askAI(message) {

    const response = await fetch(
        "https://openrouter.ai/api/v1/chat/completions",
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${API_KEY}`
            },

            body: JSON.stringify({
                model: "openrouter/free",
                messages: [
                    {
                        role: "user",
                        content: message
                    }
                ]
            })
        }
    );

    const data = await response.json();

    console.log(data);

    if (!response.ok) {
        throw new Error(data.error?.message || "API Error");
    }

    return data.choices[0].message.content;
}

askAI("Hello, explain JavaScript in simple words")
    .then(answer => {
        console.log("AI:", answer);
    })
    .catch(error => {
        console.log("ERROR:", error.message);
    });