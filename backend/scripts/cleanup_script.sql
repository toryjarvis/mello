-- Cleanup script to remove any old tables when needed
-- Note: add CASCADE to each drop table to alleviate any order confusion 
DROP TABLE IF EXISTS boards CASCADE;
DROP TABLE IF EXISTS lists CASCADE;
DROP TABLE IF EXISTS cards CASCADE;
DROP TABLE IF EXISTS checklists CASCADE;
DROP TABLE IF EXISTS checklist_items CASCADE;
DROP TABLE IF EXISTS card_history CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS card_assignees CASCADE;
DROP TABLE IF EXISTS comments CASCADE;
DROP TABLE IF EXISTS board_members CASCADE;
