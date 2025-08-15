const express = require("express");
const cors = require("cors");
require("dotenv").config();

const blockchainRoutes = require("./routes/blockchainRoutes");
const mnemonicRoutes = require("./routes/mnemonicRoutes");
const { mnemonicMiddleware } = require("./middleware/mnemonicMiddleware");

const PORT = process.env.PORT || 3001;

const allowedOrigins = [
    "http://localhost:5173",
    process.env.DOMAINS
];

const app = express();

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/mnemonics", mnemonicRoutes);
app.use("/api/blockchains", mnemonicMiddleware, blockchainRoutes);

app.listen(PORT, () => {
    console.log(`server is running successfully on ${PORT}`);
});
