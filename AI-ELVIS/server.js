import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY="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",
});

app.get("/", (req, res) => {
  res.send("AI-ELVIS backend is running 🚀");
});

app.post("/ask", async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({
        error: "Prompt is required",
      });
    }

    const response = await client.responses.create({
      model: "gpt-4.1-mini",
      input: `
You are AI-ELVIS v1.0, a helpful Physics and Mathematics assistant.
Answer clearly and step-by-step.

Question:
${prompt}
      `,
    });

    res.json({
      answer: response.output_text,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Error connecting to AI backend",
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
async function askAI() {
  const question = document.getElementById("question").value;

  const response = await fetch(
    "https://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.com/ask",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        prompt: question
      })
    }
  );

  const data = await response.json();

  document.getElementById("answer").innerHTML =
    data.answer || data.error;
}