import * as fs from "fs";
import * as crypto from "crypto";
import axios from "axios";
import path from "path";

export async function getImageUrl() {}

export async function bundleImage(url: string, key: string) {
  const hash = crypto.createHash("sha256").update(key).digest("hex");
  const imagePath = `./public/img/${hash}`;

  if (!fs.existsSync(imagePath)) {
    console.log("Download Image", key);
    await downloadImage(url, imagePath);
  }
  return `/img/${hash}`;
}

async function downloadImage(url: string, filepath: string) {
  const response = await axios({
    url,
    method: "GET",
    responseType: "stream",
  });

  if (!fs.existsSync(path.dirname(filepath))) {
    fs.mkdirSync(path.dirname(filepath));
  }

  const writer = fs.createWriteStream(filepath);
  response.data.pipe(writer);

  return new Promise((resolve, reject) => {
    writer.on("finish", () => {
      resolve(1);
    });
    writer.on("error", (err) => {
      reject(err);
    });
  });
}
