require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const port = 3541;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post("/api/prompt", async (req, res) => {
  const { prompt } = req.body;
  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      temperature: 0,
      max_tokens: 500,
    });
    const text = response.data.choices[0].text;
    res.json({ data: text });
  } catch (error) {
    res.sendStatus(error.response.status);
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}...`);
});
