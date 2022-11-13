CREATE TABLE orders
(
  id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id INTEGER,
  status_name VARCHAR(20),
  CONSTRAINT fk_user_id
    FOREIGN KEY(user_id)
      REFERENCES users(id) ON DELETE CASCADE,
  CONSTRAINT fk_status_name
    FOREIGN KEY(status_name)
      REFERENCES statuses(status_name)
);