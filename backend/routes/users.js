import express from "express";

import { getBoardsByUser } from "../services/boardService.js";
import { getUserById } from "../services/userService.js";

const router = express.Router();

//get user info
router.get("/:userId", async (req, res) => {
  try {
    const user = await getUserById(req.params.userId);
    //no user specifically? 404
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to get user" });
  }
});

//get user boards
router.get("/:userId/boards", async (req, res) => {
  try {
    //check for user before returning boards
    const user = await getUserById(req.params.userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const boards = await getBoardsByUser(req.params.userId);
    res.json(boards);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to get boards" });
  }
});

export default router;
