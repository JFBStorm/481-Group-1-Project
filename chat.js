const chatbotToggler = document.querySelector(".chatbot-toggler");
const closeBtn = document.querySelector(".close-btn");
const chatbox = document.querySelector(".chatbox");
const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");

let userMessage = null; // Variable to store user's message
const inputInitHeight = chatInput.scrollHeight;

// Predefined questions and answers
const qaMap = [
  { 
    questions: ["what are your business hours", "are you open", "when do you close", "when do you close today", "when are you open", "when does your kitchen close", "what time does your kitchen close", "what time does your kitchen close today"], 
    answer: "We are open Monday - Saturday from 11:00 a.m. - 9:00 p.m., and Sunday 4:00 p.m. - 9:00 p.m. Our kitchen closes at 8:45 p.m."
  },
  { 
    questions: ["do you have parking", "where do I park", "is parking available", "is parking free", "where can I find parking", "is there a parking lot", "where is the parking"], 
    answer: "We have free, public parking available in the parking lot."
  },
  { 
    questions: ["where are you located", "where are you", "what is the location", "location", "directions", "where can I find you", "where is this", "where do I go"], 
    answer: "Our Address is: 895 W Eisenhower Pkwy, Ann Arbor, MI 48103."
  },
  { 
    questions: ["what are your most popular dishes", "eregiguwg"], 
    answer: "Our most popular dishes are the Momo Burrito, Scotland Roll, Avocado Roll, and the Chicken Katsu Don."
  },
  { 
    questions: ["do you take reservations", "reservations", "can I make a reservation", "how do I make a reservation"], 
    answer: "You can place a reservation through our website [link], or by calling our restaurant at (734) 800-4909."
  },
  { 
    questions: ["what are your specials", "specials", "lunch specials", "lunch special hours", "do you have specials", "special", "lunch special time", "when do lunch specials end"], 
    answer: "Our Lunch Specials are from 11:00 a.m. - 2:30 p.m. [link to menu for lunch specials]."
  },
  { 
    questions: ["do you have wi-fi", "do you have wifi"], 
    answer: "Yes, we have wi-fi for our guests."
  },
  { 
    questions: ["do you have outdoor seating"], 
    answer: "No, we do not have outdoor seating."
  },
  { 
    questions: ["do you have gluten-free options"], 
    answer: "Yes, please see the Gluten-Free."
  },
  { 
    questions: ["how can I place orders"], 
    answer: "Online or call us at (734) 800-4909."
  },
  { 
    questions: ["current wait times", "how long does it take to prepare food", "how long will my order take"], 
    answer: "Orders typically take 10-15 minutes."
  }
];

const createChatLi = (message, className) => {
  const chatLi = document.createElement("li");
  chatLi.classList.add("chat", `${className}`);
  let chatContent = className === "outgoing" ? `<p></p>` : `<span class="material-symbols-outlined">smart_toy</span><p></p>`;
  chatLi.innerHTML = chatContent;
  chatLi.querySelector("p").textContent = message;
  return chatLi; // return chat <li> element
};

const generateResponse = (chatElement) => {
  const messageElement = chatElement.querySelector("p");

  // Convert user's message to lowercase for case-insensitive matching
  const lowerCaseMessage = userMessage.toLowerCase();

  // Find the answer that matches any of the predefined questions
  let response = "I'm sorry, I don't have an answer for that. Please ask another question!";
  for (const item of qaMap) {
    if (item.questions.includes(lowerCaseMessage)) {
      response = item.answer;
      break;
    }
  }

  // Update the message element with the response
  messageElement.textContent = response;

  // Scroll to the latest message
  chatbox.scrollTo(0, chatbox.scrollHeight);
};

const handleChat = () => {
  userMessage = chatInput.value.trim(); // Get user entered message and remove extra whitespace
  if (!userMessage) return;

  // Clear the input textarea and set its height to default
  chatInput.value = "";
  chatInput.style.height = `${inputInitHeight}px`;

  // Append the user's message to the chatbox
  chatbox.appendChild(createChatLi(userMessage, "outgoing"));
  chatbox.scrollTo(0, chatbox.scrollHeight);

  setTimeout(() => {
    // Display "Thinking..." message while waiting for the response
    const incomingChatLi = createChatLi("Thinking...", "incoming");
    chatbox.appendChild(incomingChatLi);
    chatbox.scrollTo(0, chatbox.scrollHeight);
    generateResponse(incomingChatLi);
  }, 600);
};

chatInput.addEventListener("input", () => {
  // Adjust the height of the input textarea based on its content
  chatInput.style.height = `${inputInitHeight}px`;
  chatInput.style.height = `${chatInput.scrollHeight}px`;
});

chatInput.addEventListener("keydown", (e) => {
  // If Enter key is pressed without Shift key and the window
  // width is greater than 800px, handle the chat
  if (e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
    e.preventDefault();
    handleChat();
  }
});

sendChatBtn.addEventListener("click", handleChat);
closeBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"));
chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));
