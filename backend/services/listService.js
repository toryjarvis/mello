import pool from "../db.js";

export const getListById = async (listId) => {
  const { rows } = await pool.query("SELECT * FROM lists WHERE id = $1", [
    listId,
  ]);
  return rows[0];
};

export const getListsByBoard = async (boardId) => {
  const { rows } = await pool.query(
    "SELECT * FROM lists WHERE board_id = $1 ORDER BY position ASC",
    [boardId],
  );
  return rows;
};

export const createList = async (boardId, list_name, position) => {
  let listPosition = position;
  if (listPosition === undefined || listPosition === null) {
    const { rows: posRows } = await pool.query(
      "SELECT COALESCE(MAX(position), -1) + 1 AS next_pos FROM lists WHERE board_id = $1",
      [boardId]
    );
    listPosition = posRows[0].next_pos;
  }
  const { rows } = await pool.query(
    "INSERT INTO lists (board_id, list_name, position) VALUES ($1, $2, $3) RETURNING *",
    [boardId, list_name, listPosition],
  );
  return rows[0];
};

export const deleteList = async (listId) => {
  await pool.query("DELETE FROM lists WHERE id = $1", [listId]);
};

export const updateListName = async (listId, list_name) => {
  const { rows } = await pool.query(
    "UPDATE lists SET list_name = $1 WHERE id = $2 RETURNING *",
    [list_name, listId],
  );
  return rows[0];
};

export const updateListPosition = async (listId, position) => {
  const { rows } = await pool.query(
    "UPDATE lists SET position = $1 WHERE id = $2 RETURNING *",
    [position, listId],
  );
  return rows[0];
};
