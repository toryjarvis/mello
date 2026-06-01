import express from "express";
import {
  getCardsByList,
  getCardById,
  createCard,
  deleteCard,
  updateCardName,
  updateCardDescription,
  updateCardPosition,
} from "../services/cardService.js";
import authenticateToken from "../middleware/auth.js";
import { getListById } from "../services/listService.js";
import { getBoardById } from "../services/boardService.js";

const router = express.Router();
router.use(authenticateToken);

//assert owner via the list
const assertOwnerViaList = async (listId, userId, res) => {
  const list = await getListById(listId);
  if (!list) { res.status(404).json({ error: "List not found" }); return false; }
  const board = await getBoardById(list.board_id);
  if (!board) { res.status(404).json({ error: "Board not found" }); return false; }
  if (board.owner_id !== parseInt(userId)) { res.status(403).json({ error: "Forbidden"}); return false; }
  return list;
}

//assert owner via the card
const assertOwnerViaCard = async (cardId, userId, res) => {
  const card = await getCardById(cardId);
  if (!card) { res.status(404).json({ error: "Card not found" }); return false; }
  const list = await getListById(card.list_id);
  if (!list) { res.status(404).json({ error: "List not found" }); return false; }
  const board = await getBoardById(list.board_id);
  if (!board) { res.status(404).json({ error: "Board not found" }); return false; }
  if (board.owner_id !== parseInt(userId)) { res.status(403).json({ error: "Forbidden"}); return false; }
  return card;
}

//get cards by list id
router.get("/list/:listId", async (req, res) => {
  try {
    const list = await assertOwnerViaList(req.params.listId, req.user.id, res);
    if (!list) return;
    const cards = await getCardsByList(req.params.listId);
    res.json(cards);
  } catch (error) {
    console.error("Error fetching cards:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//create card
router.post("/", async (req, res) => {
  try {
    const { listId, title, position, card_description } = req.body;
    const list = await assertOwnerViaList(listId, req.user.id, res);
    if (!list) return;
    const newCard = await createCard(listId, title, position, card_description);
    res.status(201).json(newCard);
  } catch (error) {
    console.error("Error creating card:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//delete card
router.delete("/:id", async (req, res) => {
  try {
    const card = await assertOwnerViaCard(req.params.id, req.user.id, res)
    if (!card) return
    await deleteCard(req.params.id);
    res.status(204).end();
  } catch (error) {
    console.error("Error deleting card:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//update card name
router.put("/:id/name", async (req, res) => {
  try {
    const card = await assertOwnerViaCard(req.params.id, req.user.id, res)
    if (!card) return
    const updatedCard = await updateCardName(req.params.id, req.body.title);
    res.json(updatedCard);
  } catch (error) {
    console.error("Error updating card name:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//update card description
router.put("/:id/description", async (req, res) => {
  try {
    const card = await assertOwnerViaCard(req.params.id, req.user.id, res)
    if (!card) return
    const updatedCard = await updateCardDescription(
      req.params.id,
      req.body.card_description,
    );
    res.json(updatedCard);
  } catch (error) {
    console.error("Error updating card description:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//update card position
router.put("/:id/position", async (req, res) => {
  try {
    const card = await assertOwnerViaCard(req.params.id, req.user.id, res)
    if (!card) return
    const updatedCard = await updateCardPosition(
      req.params.id,
      req.body.position,
    );
    res.json(updatedCard);
  } catch (error) {
    console.error("Error updating card position:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
