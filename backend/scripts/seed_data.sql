-- Dummy data, just to seed into tables for testing and development
INSERT INTO users (id, email, display_name, password_hash) VALUES
(1, 'user1@example.com', 'User One', 'hashed_password_1'),
(2, 'user2@example.com', 'User Two', 'hashed_password_2');
INSERT INTO boards (id, owner_id, name, description, is_public) VALUES
(1, 1, 'Project Alpha', 'Board for Project Alpha tasks', true),
(2, 2, 'Project Beta', 'Board for Project Beta tasks', false);
INSERT INTO lists (id, board_id, list_name, position) VALUES
(1, 1, 'To Do', 0),
(2, 1, 'In Progress', 1),
(3, 1, 'Done', 2),
(4, 2, 'Backlog', 0),
(5, 2, 'Sprint', 1);
INSERT INTO cards (id, list_id, title, card_description, due_date, priority, labels) VALUES
(1, 1, 'Set up project repository', 'Initialize Git repository and set up CI/CD', '2024-07-01 12:00:00', 'High', ARRAY['setup', 'devops']),
(2, 2, 'Design database schema', 'Create ER diagrams and define tables', '2024-07-05 15:00:00', 'Medium', ARRAY['design', 'database']),
(3, 3, 'Implement authentication', 'Set up user login and registration', '2024-07-10 18:00:00', 'High', ARRAY['backend', 'security']),
(4, 4, 'Gather requirements', 'Meet with stakeholders to gather project requirements', '2024-07-03 10:00:00', 'Low', ARRAY['meeting', 'planning']),
(5, 5, 'Create wireframes', 'Design wireframes for the main user interface', '2024-07-08 14:00:00', 'Medium', ARRAY['design', 'ui']);
INSERT INTO checklists (id, card_id, checklist_name) VALUES
(1, 1, 'Repository Setup Steps'),
(2, 2, 'Database Design Steps');
INSERT INTO checklist_items (id, checklist_id, item_description, is_completed) VALUES
(1, 1, 'Create Git repository', true),
(2, 1, 'Set up CI/CD pipeline', false),
(3, 2, 'Draft ER diagrams', true),
(4, 2, 'Define tables and relationships', false);
INSERT INTO card_history (id, card_id, action, action_timestamp) VALUES
(1, 1, 'Card created', '2024-06-20 09:00:00'),
(2, 1, 'Moved to To Do list', '2024-06-20 09:05:00'),
(3, 2, 'Card created', '2024-06-21 10:00:00'),
(4, 2, 'Moved to In Progress list', '2024-06-22 11:00:00');
