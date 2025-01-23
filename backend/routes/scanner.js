require("dotenv").config();
const express = require("express");
const multer = require("multer");
const fs = require("fs");
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');


const upload = multer({ dest: "uploads/" });
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

function fileToGenerativePart(path, mimeType) {
  return {
    inlineData: {
      data: Buffer.from(fs.readFileSync(path)).toString("base64"),
      mimeType,
    },
  };
}

router.post("/api/scanner", upload.single("image"), async (req, res) => {
  const file = req.file;

  if (!file) {
    return res.status(400).json({ error: "No image provided" });
  }

  try {
    const imagePath = file.path;
    const mimeType = file.mimetype; // e.g., "image/png"
    const imagePart = fileToGenerativePart(imagePath, mimeType);

    const prompt =
      "Give me the product details and give a sustainability score for the item out of 100 and one or two line on it.";
    const result = await model.generateContent([prompt, imagePart]);

    // Parse the response from Gemini API
    const responseText = result.response.text();
    console.log(responseText)

    // Delete the uploaded file after processing
    fs.unlinkSync(imagePath);

    res.status(200).json({ details: responseText });
  } catch (error) {
    console.error("Error processing barcode:", error.message);
    res.status(500).json({ error: "Failed to process barcode" });
  }
});

module.exports = router;
