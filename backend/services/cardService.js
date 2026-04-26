import pool from "../db.js";

export const getCardsByList = async (listId) => {
  const { rows } = await pool.query(
    "SELECT * FROM cards WHERE list_id = $1 ORDER BY position ASC",
    [listId],
  );
  return rows;
};

export const getCardById = async (cardId) => {
  const { rows } = await pool.query("SELECT * FROM cards WHERE id = $1", [
    cardId,
  ]);
  return rows[0];
};

export const createCard = async (
  listId,
  title,
  position,
  card_description = "",
) => {
  let cardPosition = position;
  if (cardPosition === undefined || cardPosition === null) {
    const { rows: posRows } = await pool.query(
      "SELECT COALESCE(MAX(position), -1) + 1 AS next_pos FROM cards WHERE list_id = $1",
      [listId]
    );
    cardPosition = posRows[0].next_pos;
  }
  const { rows } = await pool.query(
    "INSERT INTO cards (list_id, title, position, card_description) VALUES ($1, $2, $3, $4) RETURNING *",
    [listId, title, cardPosition, card_description],
  );
  return rows[0];
};

export const deleteCard = async (cardId) => {
  await pool.query("DELETE FROM cards WHERE id = $1", [cardId]);
};

export const updateCardName = async (cardId, title) => {
  const { rows } = await pool.query(
    "UPDATE cards SET title = $1 WHERE id = $2 RETURNING *",
    [title, cardId],
  );
  return rows[0];
};

export const updateCardDescription = async (cardId, card_description) => {
  const { rows } = await pool.query(
    "UPDATE cards SET card_description = $1 WHERE id = $2 RETURNING *",
    [card_description, cardId],
  );
  return rows[0];
};

export const updateCardPosition = async (cardId, position) => {
  const { rows } = await pool.query(
    "UPDATE cards SET position = $1 WHERE id = $2 RETURNING *",
    [position, cardId],
  );
  return rows[0];
};
