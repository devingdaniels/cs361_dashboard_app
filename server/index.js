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
    const data = response.data.choices[0].text;
    console.log(response.data);
    console.log(data);
    res.json({ text: data });
  } catch (error) {
    console.log(error);
  }
});

app.post("/api/image", async (req, res) => {
  const { prompt } = req.body;
  try {
    const response = await openai.createImage({
      prompt: prompt,
      n: 1,
      size: "256x256",
    });
    res.json({ text: response.data.data[0].url });
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}...`);
});
