import express from "express";
import boardsRouter from "./routes/boards.js";
import usersRouter from "./routes/users.js";
import listsRouter from "./routes/lists.js";
import cardsRouter from "./routes/cards.js";

const app = express();
app.use(express.json());

app.use("/boards", boardsRouter);
app.use("/users", usersRouter);
app.use("/lists", listsRouter);
app.use("/cards", cardsRouter);

app.listen(5000, () => console.log("API running: http://localhost:5000"));
