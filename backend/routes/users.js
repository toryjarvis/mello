import express from "express";
import { getBoardsByUser } from "../services/boardService.js";
import { getUserById } from "../services/userService.js";
import pool from "../db.js";
import authenticateToken from "../middleware/auth.js";
import bcrypt from "bcrypt";

const router = express.Router();

// get user info
router.get("/:userId", authenticateToken, async (req, res) => {
  try {
    const user = await getUserById(req.params.userId);
    //no user specifically? 404
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to get user." });
  }
});

// get user boards
router.get("/:userId/boards", authenticateToken, async (req, res) => {
  try {
    // check for user before returning boards
    const user = await getUserById(req.params.userId);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }
    if (req.user.id !== parseInt(req.params.userId)) {
      return res.status(403).json({ error: "Forbidden" });
    }
    const boards = await getBoardsByUser(req.params.userId);
    res.json(boards);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to get boards." });
  }
});

// update user info (e.g. username, email)
router.put("/:userId", authenticateToken, async (req, res) => {
  try {
    const user = await getUserById(req.params.userId);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }
    if (req.user.id !== parseInt(req.params.userId)) {
      return res.status(403).json({ error: "Forbidden" });
    }
    const { username, email } = req.body;
    const updatedUser = await pool.query(
      "UPDATE users SET username = $1, email = $2 WHERE id = $3 RETURNING *",
      [username, email, req.params.userId],
    );
    res.json(updatedUser.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update user." });
  }
});

// delete user account
router.delete("/:userId", authenticateToken, async (req, res) => {
  try {
    const user = await getUserById(req.params.userId);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }
    if (req.user.id !== parseInt(req.params.userId)) {
      return res.status(403).json({ error: "Forbidden" });
    }
    await pool.query("DELETE FROM users WHERE id = $1", [req.params.userId]);
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete user." });
  }
});

// update user password
router.put("/:userId/password", authenticateToken, async (req, res) => {
  try {
    const user = await getUserById(req.params.userId);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }
    if (req.user.id !== parseInt(req.params.userId)) {
      return res.status(403).json({ error: "Forbidden" });
    }
    const { password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query("UPDATE users SET password_hash = $1 WHERE id = $2", [
      hashedPassword,
      req.params.userId,
    ]);
    res.json({ message: "Password updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update password." });
  }
});

export default router;
