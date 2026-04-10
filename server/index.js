const express = require("express");
const cors = require("cors");
const { analyzeUser } = require("./ai/engine");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server running 🚀");
});

app.post("/analyze-user", (req, res) => {
  try {
    const userData = req.body;

    const result = analyzeUser(userData);

    res.json({
      message: "Analysis complete",
      aiPlan: result
    });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
