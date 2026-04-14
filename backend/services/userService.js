import pool from "../db.js";

export const getUserById = async (userId) => {
  const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [
    userId,
  ]);
  return rows[0];
};

export const createUser = async (username, email, passwordHash) => {
  const { rows } = await pool.query(
    "INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING *",
    [username, email, passwordHash]
  );
  return rows[0];
};

export const getUserByEmail = async (email) => {
  const { rows } = await pool.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);
  return rows[0];
};

export const updateUserPassword = async (userId, newPasswordHash) => {
  const { rows } = await pool.query(
    "UPDATE users SET password_hash = $1 WHERE id = $2 RETURNING *",
    [newPasswordHash, userId]
  );
  return rows[0];
};

export const updateUserUsername = async (userId, newUsername) => {
  const { rows } = await pool.query(
    "UPDATE users SET username = $1 WHERE id = $2 RETURNING *",
    [newUsername, userId]
  );
  return rows[0];
};

export const updateUserEmail = async (userId, newEmail) => {
  const { rows } = await pool.query(
    "UPDATE users SET email = $1 WHERE id = $2 RETURNING *",
    [newEmail, userId]
  );
  return rows[0];
};

export const deleteUser = async (userId) => {
  await pool.query("DELETE FROM users WHERE id = $1", [userId]);
};

export const getAllUsers = async () => {
  const { rows } = await pool.query("SELECT * FROM users");
  return rows;
};

export const getUsersByBoard = async (boardId) => {
  const { rows } = await pool.query(
    `SELECT u.* FROM users u
     JOIN board_members bm ON u.id = bm.user_id
     WHERE bm.board_id = $1`,
    [boardId]
  );
  return rows;
};

export const addUserToBoard = async (userId, boardId) => {
  await pool.query(
    "INSERT INTO board_members (user_id, board_id) VALUES ($1, $2) ON CONFLICT DO NOTHING",
    [userId, boardId]
  );
};

export const removeUserFromBoard = async (userId, boardId) => {
  await pool.query(
    "DELETE FROM board_members WHERE user_id = $1 AND board_id = $2",
    [userId, boardId]
  );
};

export const getUserByUsername = async (username) => {
  const { rows } = await pool.query("SELECT * FROM users WHERE username = $1", [
    username,
  ]);
  return rows[0];
};

export const searchUsersByUsername = async (searchTerm) => {
  const { rows } = await pool.query(
    "SELECT * FROM users WHERE username ILIKE $1",
    [`%${searchTerm}%`]
  );
  return rows;
};

export const searchUsersByEmail = async (searchTerm) => {
  const { rows } = await pool.query(
    "SELECT * FROM users WHERE email ILIKE $1",
    [`%${searchTerm}%`]
  );
  return rows;
};

export const getUserCount = async () => {
  const { rows } = await pool.query("SELECT COUNT(*) FROM users");
  return parseInt(rows[0].count, 10);
};
