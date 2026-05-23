import express from "express";
import {
  getListsByBoard,
  getListById,
  createList,
  deleteList,
  updateListName,
  updateListPosition,
} from "../services/listService.js";
import authenticateToken from "../middleware/auth.js";
import { getBoardById } from "../services/boardService.js";

const router = express.Router();
router.use(authenticateToken);

//assert board owner for auth purposes
const assertBoardOwner = async (boardId, userId, res) => {
  const board = await getBoardById(boardId);
  if (!board) { res.status(404).json({ error: "Board not found" }); return false; }
  if (board.owner_id !== parseInt(userId)) { res.status(403).json({ error: "Forbidden"}); return false; }
  return board;
}

//assert owner via the list
const assertOwnerViaList = async (listId, userId, res) => {
  const list = await getListById(listId);
  if (!list) { res.status(404).json({ error: "List not found" }); return false; }
  const board = await getBoardById(list.board_id);
  if (!board) { res.status(404).json({ error: "Board not found" }); return false; }
  if (board.owner_id !== parseInt(userId)) { res.status(403).json({ error: "Forbidden"}); return false; }
  return list;
}

//get lists by board id
router.get("/board/:boardId", async (req, res) => {
  try {
    const board = await assertBoardOwner(req.params.boardId, req.user.id, res);
    if (!board) return;
    const lists = await getListsByBoard(req.params.boardId);
    res.json(lists);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to get lists" });
  }
});

//create list
router.post("/", async (req, res) => {
  try {
    const { boardId, list_name, position } = req.body;
    const board = await assertBoardOwner(boardId, req.user.id, res);
    if (!board) return;
    const newList = await createList(boardId, list_name, position);
    res.status(201).json(newList);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create list" });
  }
});

//delete list
router.delete("/:id", async (req, res) => {
  try {
    const list = await assertOwnerViaList(req.params.id, req.user.id, res);
    if (!list) return;
    await deleteList(req.params.id);
    res.status(204).end();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete list" });
  }
});

//update list name
router.put("/:id/name", async (req, res) => {
  try {
    const list = await assertOwnerViaList(req.params.id, req.user.id, res);
    if (!list) return;
    const updatedList = await updateListName(req.params.id, req.body.list_name);
    res.json(updatedList);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update list name" });
  }
});

//update list position
router.put("/:id/position", async (req, res) => {
  try {
    const list = await assertOwnerViaList(req.params.id, req.user.id, res);
    if (!list) return;
    const updatedList = await updateListPosition(
      req.params.id,
      req.body.position,
    );
    res.json(updatedList);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update list position" });
  }
});

export default router;
