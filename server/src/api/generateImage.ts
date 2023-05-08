import { Request, Response } from "express";
import { base64Image } from "../data/image";
import { OpenAIApi, Configuration } from "openai";

export async function generateImage(req: Request, res: Response) {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  type inputType = {
    shape: string;
    color: string;
    prompt: string;
    style: string;
    numberOfIcons: string;
  };

  const input: inputType = req.body;
  console.log(input);
  // const n: number = parseInt(numberOfIcons);
  if (process.env.MOCK_DALLE === "true") {
    res.json(base64Image);
    return;
  } else {
    try {
      const response = await openai.createImage({
        prompt: `a modern ${input.shape} icon in ${input.color} of ${input.prompt}, ${input.style}, minimialistic, high quality, trending on art station, unreal engine graphics quality`,
        n: input.numberOfIcons ? parseInt(input.numberOfIcons, 10) : 1,
        size: "512x512",
        response_format: "b64_json",
      });
      return res.json({ images: response.data.data });
    } catch (err) {
      return res.json({ status: 418, error: JSON.stringify(err) });
    }
  }
}
