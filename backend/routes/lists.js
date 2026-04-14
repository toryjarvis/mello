import express from "express";
import {
  getListsByBoard,
  createList,
  deleteList,
  updateListName,
  updateListPosition,
} from "../services/listService.js";

const router = express.Router();

//get lists by board id
router.get("/board/:boardId", async (req, res) => {
  try {
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
