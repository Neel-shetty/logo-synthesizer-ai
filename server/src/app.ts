import express from "express";
import bodyParser from "body-parser";
import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import { generateImage } from "./api/generateImage";
dotenv.config();

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/", (req, res) => {
  res.json({ Hello: "test", world: "test" });
});

app.get ("/generate-image", generateImage);

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
