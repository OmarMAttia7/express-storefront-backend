CREATE TABLE users 
(
  id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  first_name VARCHAR(50),
  last_name VARCHAR(50),
  password_digest CHAR(60)
);