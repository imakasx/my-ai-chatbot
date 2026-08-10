const input = document.getElementById("messageInput");
const sBtn = document.getElementById("sendBtn");
const chatContainer = document.querySelector(".main-screen");

const API_KEY = "api-key"; // Replace with your actual API key

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

    // console.log(data);

    if (!response.ok) {
        throw new Error(data.error?.message || "API Error");
    }

    return data.choices[0].message.content;
}


sBtn.addEventListener("click" , ()=>{
    const msg = input.value;
    input.value = "";
    usermsg(msg);
    askAI(msg).then(answer => {
        aireply(answer);
    })
    .catch(error => {
        console.log("ERROR:", error.message);
    });
})


function usermsg(msg){
    chatContainer.innerHTML += `<div class="message user">${msg}</div>`
}
function aireply(msg){
    chatContainer.innerHTML += `<div class="ai-message">
                <img src="img/ai.jpg" alt="">
                <div class="message ai">${msg}</div>
            </div>`
}
