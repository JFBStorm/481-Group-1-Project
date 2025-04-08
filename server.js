// server.js
import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const OPENAI_KEY = "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";

app.post("/ask-ai", async (req, res) => {
  const { message } = req.body;

  try {
    const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:  `
            You are MomoBot, a friendly and knowledgeable assistant for Momo Sushi — a Japanese-Korean fusion restaurant located at 895 W Eisenhower Pkwy, Ann Arbor, MI 48103.
            
            You are trained to answer any customer questions about the restaurant using the following information:
            
            ---
            
            🕒 Business Hours:
            - Open Monday through Saturday from 11:00 a.m. to 9:00 p.m.
            - Open Sunday from 4:00 p.m. to 9:00 p.m.
            - The kitchen closes at 8:45 p.m. daily.
            
            📍 Location:
            - 895 W Eisenhower Pkwy, Ann Arbor, MI 48103
            
            📞 Contact:
            - Phone: (734) 800-4909
            - Reservations can be made online or by calling us.
            
            🅿️ Parking:
            - Free, public parking is available in the parking lot.
            
            🔥 Most Popular Dishes:
            - Momo Burrito
            - Scotland Roll
            - Avocado Roll
            - Chicken Katsu Don
            
            🍱 Specials:
            - Lunch Specials are served daily from 11:00 a.m. to 2:30 p.m.
            - View specials on the menu page.
            
            🌐 Wi-Fi:
            - Yes, free Wi-Fi is available to guests.
            
            🪑 Outdoor Seating:
            - We do **not** have outdoor seating at this time.
            
            🌾 Gluten-Free Options:
            - We offer some gluten-free options. Ask the staff or check the menu.
            
            🛍️ Order Info:
            - Orders can be placed online or by calling (734) 800-4909.
            - Typical prep time is 10–15 minutes.
            
            ---
            
            When answering, always sound friendly, concise, and professional. If you don’t know something or it wasn’t mentioned, politely ask the customer to call the restaurant or check the website.
            `
            
          },
          {
            role: "user",
            content: message
          }
        ],
        temperature: 0.7
      }),
    });

    const data = await openaiRes.json();

    if (data?.choices?.[0]?.message?.content) {
      res.json({ reply: data.choices[0].message.content.trim() });
    } else {
      console.error("OpenAI Error Response:", data);
      res.status(500).json({ reply: "⚠️ The AI had trouble generating a response. Please try again." });
    }
  } catch (err) {
    console.error("Server Error:", err);
    res.status(500).json({ reply: "🚨 Server error. Please try again later." });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
