import type { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("Missing Environment Variable OPENAI_API_KEY");
  }

  const topic = req.body.topic;
  console.log("........", topic);
  // checking for input
  if (topic === undefined || topic === "") {
    console.log("data not recieved");
    res.status(500).json({
      error: {
        message: "An error occurred during your request.",
      },
    });
    return;
  }

  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: "OpenAI API key not configured properly or expired",
      },
    });
    return;
  }
  try {
    // could be furhter improved
    const prompt = `please generate 5 true or false question and answer based on this topic ${topic}  no description Exactly like the following format: [ {question: "",  answer:" true or false"}]`;

    const payload = {
      model: "text-davinci-003",
      prompt: prompt,
      temperature: process.env.AI_TEMP ? parseFloat(process.env.AI_TEMP) : 0.7,
      max_tokens: process.env.AI_MAX_TOKENS
        ? parseInt(process.env.AI_MAX_TOKENS)
        : 400,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 1,
    };

    const response = await openai.createCompletion(payload);
    const firstResponse = response.data.choices[0].text;
    res.status(200).json({ result: firstResponse });
  } catch (error) {
    // console.log("open api data fetching error: ", error);
    throw error;
  }
}
