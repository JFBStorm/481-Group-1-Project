const chatbotToggler = document.querySelector(".chatbot-toggler");
const closeBtn = document.querySelector(".close-btn");
const chatbox = document.querySelector(".chatbox");
const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");

let userMessage = null;
const inputInitHeight = chatInput.scrollHeight;

// Create chat bubble
const createChatLi = (message, className) => {
  const chatLi = document.createElement("li");
  chatLi.classList.add("chat", className);
  const chatContent = className === "outgoing"
    ? `<p>${message}</p>`
    : `<span class="material-symbols-outlined">smart_toy</span><p>${message}</p>`;
  chatLi.innerHTML = chatContent;
  return chatLi;
};

// Get response from your server
const generateResponse = async (chatElement) => {
  const messageElement = chatElement.querySelector("p");
  messageElement.textContent = "Thinking...";

  try {
    const response = await fetch("http://localhost:3000/ask-ai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userMessage })
    });

    const data = await response.json();

    if (data?.reply) {
      messageElement.textContent = data.reply;
    } else {
      messageElement.textContent = "⚠️ Sorry, I couldn't generate a response.";
      console.error("No reply field in response:", data);
    }
  } catch (err) {
    messageElement.textContent = "🚨 Error reaching the assistant.";
    console.error("Chatbot error:", err);
  }

  chatbox.scrollTo(0, chatbox.scrollHeight);
};

// Handle user sending a message
const handleChat = () => {
  userMessage = chatInput.value.trim();
  if (!userMessage) return;

  chatInput.value = "";
  chatInput.style.height = `${inputInitHeight}px`;

  // Append user chat
  const userChat = createChatLi(userMessage, "outgoing");
  chatbox.appendChild(userChat);
  chatbox.scrollTo(0, chatbox.scrollHeight);

  // Append thinking message and get AI reply
  setTimeout(() => {
    const incomingChat = createChatLi("Thinking...", "incoming");
    chatbox.appendChild(incomingChat);
    chatbox.scrollTo(0, chatbox.scrollHeight);
    generateResponse(incomingChat);
  }, 500);
};

// Textarea height handling
chatInput.addEventListener("input", () => {
  chatInput.style.height = `${inputInitHeight}px`;
  chatInput.style.height = `${chatInput.scrollHeight}px`;
});

// Handle Enter key press
chatInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    handleChat();
  }
});

// Button event listeners
sendChatBtn.addEventListener("click", handleChat);
closeBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"));
chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));
