import { Request, Response } from "express";
import { base64Image } from "../data/image";
import { OpenAIApi, Configuration } from "openai";

export async function generateImage(req: Request, res: Response) {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  console.log(process.env.OPENAI_API_KEY);
  // const {} = req.params;
  // const n: number = parseInt(numberOfIcons);
  if (process.env.MOCK_DALLE === "true") {
    return new Array<string>(1).fill(base64Image);
  } else {
    const input = {
      shape: "circle",
      color: "red",
      prompt: "an angry chicken",
      style: "metallic",
    };
    const response = await openai.createImage({
      prompt: `a modern ${input.shape} icon in ${input.color} of ${input.prompt}, ${input.style}, minimialistic, high quality, trending on art station, unreal engine graphics quality`,
      n: 1,
      size: "512x512",
      response_format: "b64_json",
    });
    return res.json({ image: response.data.data[0] });
  }
}
