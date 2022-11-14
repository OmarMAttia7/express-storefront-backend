CREATE TABLE orders_products
(
  id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  order_id INTEGER,
  product_id INTEGER,
  quantity INTEGER,
  CONSTRAINT fk_order_id
    FOREIGN KEY(order_id)
      REFERENCES orders(id) ON DELETE CASCADE,
  CONSTRAINT fk_product_id
    FOREIGN KEY(product_id)
      REFERENCES products(id) ON DELETE CASCADE
);