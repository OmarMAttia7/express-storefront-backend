CREATE TABLE products
(
  id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  product_name TEXT,
  magnified_price INTEGER,
  currency_code CHAR(3),
  category_id INTEGER,
  CONSTRAINT fk_currency
   FOREIGN KEY(currency_code)
    REFERENCES currencies(currency_code),
  CONSTRAINT fk_category
    FOREIGN KEY(category_id)
      REFERENCES categories(id)
);