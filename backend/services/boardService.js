import pool from "../db.js";

export const getBoardsByUser = async (userId) => {
  const { rows } = await pool.query(
    "SELECT * FROM boards WHERE owner_id = $1",
    [userId]
  );
  return rows;
};

export const getBoardById = async (boardId) => {
  const { rows } = await pool.query("SELECT * FROM boards WHERE id = $1", [
    boardId,
  ]);
  return rows[0];
};

export const createBoard = async (userId, name) => {
  const { rows } = await pool.query(
    "INSERT INTO boards (owner_id, name) VALUES ($1, $2) RETURNING *",
    [userId, name]
  );
  return rows[0];
};

export const deleteBoard = async (boardId) => {
  await pool.query("DELETE FROM boards WHERE id = $1", [boardId]);
};

export const updateBoardName = async (boardId, name) => {
  const { rows } = await pool.query(
    "UPDATE boards SET name = $1 WHERE id = $2 RETURNING *",
    [name, boardId]
  );
  return rows[0];
};

export const updateBoardDescription = async (boardId, board_description) => {
  const { rows } = await pool.query(
    "UPDATE boards SET description = $1 WHERE id = $2 RETURNING *",
    [board_description, boardId]
  );
  return rows[0];
};

export const updateBoardVisibility = async (boardId, is_public) => {
  const { rows } = await pool.query(
    "UPDATE boards SET is_public = $1 WHERE id = $2 RETURNING *",
    [is_public, boardId]
  );
  return rows[0];
};
