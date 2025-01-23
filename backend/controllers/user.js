const NotFoundError = require("../errors/not-found.js");
const User = require("../models/User.js");
const axios = require("axios");

const getScore = async (req, res) => {
  const { userId } = req.user;
  const cart = req.body?.products || [];

  const user = await User.findOne({ _id: userId }).select("-password");
  if (!user) {
    throw new NotFoundError("User not found");
  }

  res.status(200).json({ user });
};

const calcScoreFromCart = async (cart, oldScore) => {
  // return 10;
  const API_KEY = process.env.GEMINI_API_KEY;
  const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent";

  const prompt = `
      how many of the the following products are eco friendly, be lenient with your judgement(no explanation, just the number as response ):
      ${JSON.stringify(cart.map((p) => p))}
      `;

  try {
    const response = await axios.post(
      `${API_URL}?key=${API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const rawScores = response.data.candidates[0]?.content?.parts[0]?.text || "";
    console.log("Increase in score :", Number(rawScores));
    return Number(rawScores);
  } catch (error) {
    console.error("Error fetching scores:", error.message);
  }
};

const updateScore = async (req, res) => {
  const { userId } = req.user;
  const cart = req.body?.products || [];

  const user = await User.findOne({ _id: userId });
  if (!user) {
    throw new NotFoundError("User not found");
  }

  const oldScore = user.scores.length ? user.scores[user.scores.length - 1].score : 0;
  const delta = await calcScoreFromCart(cart, oldScore);

  user.scores.push({
    date: Date.now(),
    score: oldScore + delta,
  });
  await user.save();

  res.json({ change: delta });
};

module.exports = {
  getScore,
  updateScore,
};
