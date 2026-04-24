import express from "express";
import {
  getCardsByList,
  createCard,
  deleteCard,
  updateCardName,
  updateCardDescription,
  updateCardPosition,
} from "../services/cardService.js";
import authenticateToken from "../middleware/auth.js";

const router = express.Router();
router.use(authenticateToken);

//get cards by list id
router.get("/list/:listId", async (req, res) => {
  try {
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
