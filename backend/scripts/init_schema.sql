CREATE TABLE users (
    id serial PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    username VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    display_name VARCHAR(255),
    timezone VARCHAR(50) DEFAULT 'UTC',
    default_board_view VARCHAR(50) DEFAULT 'list',
    theme JSONB,
    notification_preferences JSONB,
    created_at timestamp DEFAULT current_timestamp
);

CREATE TABLE boards (
    id serial PRIMARY KEY,
    owner_id integer NOT NULL,
    name VARCHAR(255) NOT NULL,
    description text,
    board_image_url VARCHAR(255),
    is_public boolean DEFAULT false,
    is_archived boolean DEFAULT false,
    is_starred boolean DEFAULT false,
    created_at timestamp DEFAULT current_timestamp,
    updated_at timestamp DEFAULT current_timestamp,
    CONSTRAINT fk_user FOREIGN KEY(owner_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX idx_boards_owner_id ON boards(owner_id);

CREATE TABLE lists (
    id serial PRIMARY KEY,
    board_id integer NOT NULL,
    list_name VARCHAR(255) NOT NULL,
    position integer NOT NULL DEFAULT 0,
    created_at timestamp DEFAULT current_timestamp,
    updated_at timestamp DEFAULT current_timestamp,
    CONSTRAINT fk_board FOREIGN KEY(board_id) REFERENCES boards(id) ON DELETE CASCADE
);

CREATE INDEX idx_lists_board_id ON lists(board_id);

CREATE TABLE cards (
    id serial PRIMARY KEY,
    list_id integer NOT NULL,
    title VARCHAR(255) NOT NULL,
    card_description text,
    position integer NOT NULL DEFAULT 0,
    due_date timestamp,
    priority VARCHAR(50),
    labels TEXT[],
    created_at timestamp DEFAULT current_timestamp,
    updated_at timestamp DEFAULT current_timestamp,
    CONSTRAINT fk_list FOREIGN KEY(list_id) REFERENCES lists(id) ON DELETE CASCADE
);

CREATE INDEX idx_cards_list_id ON cards(list_id);
CREATE INDEX idx_cards_due_date ON cards(due_date);

CREATE TABLE checklists (
    id serial PRIMARY KEY,
    card_id integer NOT NULL,
    title VARCHAR(255) NOT NULL,
    is_completed boolean DEFAULT false,
    created_at timestamp DEFAULT current_timestamp,
    CONSTRAINT fk_card FOREIGN KEY(card_id) REFERENCES cards(id) ON DELETE CASCADE
);

CREATE TABLE checklist_items (
    id serial PRIMARY KEY,
    checklist_id integer NOT NULL,
    content VARCHAR(255) NOT NULL,
    is_completed boolean DEFAULT false,
    position integer NOT NULL DEFAULT 0,
    created_at timestamp DEFAULT current_timestamp,
    CONSTRAINT fk_checklist FOREIGN KEY(checklist_id) REFERENCES checklists(id) ON DELETE CASCADE
);

CREATE TABLE card_history (
    id serial PRIMARY KEY,
    card_id integer NOT NULL,
    user_id integer NOT NULL,
    change_type VARCHAR(50) NOT NULL,
    previous_state JSONB,
    new_state JSONB,
    changed_at timestamp DEFAULT current_timestamp,
    CONSTRAINT fk_card_history_card FOREIGN KEY(card_id) REFERENCES cards(id) ON DELETE CASCADE,
    CONSTRAINT fk_card_history_user FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE comments (
    id serial PRIMARY KEY,
    card_id integer NOT NULL,
    user_id integer NOT NULL,
    content text NOT NULL,
    created_at timestamp DEFAULT current_timestamp,
    CONSTRAINT fk_comment_card FOREIGN KEY(card_id) REFERENCES cards(id) ON DELETE CASCADE,
    CONSTRAINT fk_comment_user FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE board_members (
    id serial PRIMARY KEY,
    board_id integer NOT NULL,
    user_id integer NOT NULL,
    role VARCHAR(50) DEFAULT 'viewer',
    joined_at timestamp DEFAULT current_timestamp,
    CONSTRAINT fk_board_member_board FOREIGN KEY(board_id) REFERENCES boards(id) ON DELETE CASCADE,
    CONSTRAINT fk_board_member_user FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE (board_id, user_id)
);

CREATE TABLE card_assignees (
    id serial PRIMARY KEY,
    card_id integer NOT NULL,
    user_id integer NOT NULL,
    assigned_at timestamp DEFAULT current_timestamp,
    CONSTRAINT fk_card_assignee_card FOREIGN KEY(card_id) REFERENCES cards(id) ON DELETE CASCADE,
    CONSTRAINT fk_card_assignee_user FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE (card_id, user_id)
);

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_boards_updated_at
BEFORE UPDATE ON boards
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_lists_updated_at
BEFORE UPDATE ON lists
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_cards_updated_at
BEFORE UPDATE ON cards
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();