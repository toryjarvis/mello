import express from "express";
import boardsRouter from "./routes/boards.js";
import usersRouter from "./routes/users.js";
import listsRouter from "./routes/lists.js";
import cardsRouter from "./routes/cards.js";
import authRouter from "./routes/auth.js";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));

// Routes
app.use("/auth", authRouter);
app.use("/boards", boardsRouter);
app.use("/users", usersRouter);
app.use("/lists", listsRouter);
app.use("/cards", cardsRouter);

app.listen(process.env.PORT || 5000, () =>
  console.log("API running: http://localhost:" + (process.env.PORT || 5000)),
);
