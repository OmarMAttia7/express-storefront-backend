CREATE TABLE products
(
  id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  product_name TEXT,
  magnified_price INTEGER,
  currency_code FOREIGN KEY REFERENCES currencies(code),
  category_id FOREIGN KEY REFERENCES categories(id)
);