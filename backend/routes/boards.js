import express from "express";
import {
  getBoardsByUser,
  createBoard,
  deleteBoard,
  updateBoardName,
  updateBoardDescription,
  updateBoardVisibility,
  getBoardById
} from "../services/boardService.js";
import authenticateToken from "../middleware/auth.js";

const router = express.Router();
router.use(authenticateToken);

//assert owner for auth purposes
const assertOwner = async (boardId, userId, res) => {
  const board = await getBoardById(boardId);
  if (!board) { res.status(404).json({ error: "Board not found" }); return false; }
  if (board.owner_id !== parseInt(userId)) { res.status(403).json({ error: "Forbidden"}); return false; }
  return board;
}

//get boards by user id
router.get("/user/:userId", async (req, res) => {
  if (req.user.id !== parseInt(req.params.userId)) return res.status(403).json({ error: "Forbidden"})
  try {
    const boards = await getBoardsByUser(req.params.userId);
    res.json(boards);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to get boards" });
  }
});

//get board by board id
router.get("/:id", async (req, res) => {
  console.log("GET board id:", req.params.id, "user:", req.user.id);
  try {
    const board = await assertOwner(req.params.id, req.user.id, res); if (!board) return;
    res.json(board);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to get board" });
  }
});


//create board
router.post("/", async (req, res) => {
  try {
    const { board_name } = req.body;
    const newBoard = await createBoard(req.user.id, board_name);
    res.status(201).json(newBoard);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create board" });
  }
});

//delete board
router.delete("/:id", async (req, res) => {
  try {
    const board = await assertOwner(req.params.id, req.user.id, res); if (!board) return;
    await deleteBoard(req.params.id);
    res.status(204).end();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete board" });
  }
});

//update board name
router.put("/:id/name", async (req, res) => {
  try {
    const board = await assertOwner(req.params.id, req.user.id, res); if (!board) return;
    const updatedBoard = await updateBoardName(
      req.params.id,
      req.body.board_name,
    );
    res.json(updatedBoard);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update board name" });
  }
});

//update board description
router.put("/:id/description", async (req, res) => {
  try {
    const board = await assertOwner(req.params.id, req.user.id, res); if (!board) return;
    const updatedBoard = await updateBoardDescription(
      req.params.id,
      req.body.board_description,
    );
    res.json(updatedBoard);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update board description" });
  }
});

//update board visibility
router.put("/:id/visibility", async (req, res) => {
  try {
    const board = await assertOwner(req.params.id, req.user.id, res); if (!board) return;
    const updatedBoard = await updateBoardVisibility(
      req.params.id,
      req.body.visibility,
    );
    res.json(updatedBoard);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update board visibility" });
  }
});

export default router;
