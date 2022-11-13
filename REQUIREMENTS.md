## API Endpoints
#### Products
| Endpoint | Route |
| -------- | ----- |
| Index                                                       | GET  /products                            |
| Show                                                        | GET  /products/:id (number)               |
| Create [token required]                                     | POST /products                            |
| Products by category (args: product category)               | GET  /products/category/:category-id (number)|

#### Users
| Endpoint | Route |
| -------- | ----- |
| Index [token required]                                      | GET  /users     |
| Show [token required]                                       | GET  /users/:id |
| Create N[token required]                                    | POST /users     |

#### Orders
| Endpoint | Route |
| -------- | ----- |
| Current Order by user (args: user id)[token required]       | GET  /orders/:user-id/current  |
| Completed Orders by user (args: user id)[token required]    | GET  /orders/:user-id/completed|

## Data Shapes
#### Product
-  id
- name
- price
- category

#### User
- id
- firstName
- lastName
- password

#### Orders
- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)

## Database Schema
#### `users` Table
| field name | data type |
| ---------- | --------- |
| id              | INTEGER PRIMARY KEY GENERERATED ALWAYS AS IDENTITY |
| first_name      | VARCHAR(50)          |
| last_name       | VARCHAR(50)          |
| email           | TEXT                 |
| password_digest | CHAR(60)             |

#### `products` Table
| field name | data type |
| ---------- | --------- |
| id              | INTEGER PRIMARY KEY GENERERATED ALWAYS AS IDENTITY |
| product_name    | TEXT                 |
| magnified_price | INTEGER              |
| currency_code   | FOREIGN KEY REFERENCES currencies(code) |
| category_id     | FOREIGN KEY REFERENCES categories(id) |

#### `categories` Table
| field name | data type |
| ---------- | --------- |
| id         | INTEGER PRIMARY KEY GENERERATED ALWAYS AS IDENTITY |
| category_name       | VARCHAR(50)          |

#### `currencies` Table
| field name | data type |
| ---------- | --------- |
| code       | CHAR(3) PRIMARY KEY  |
| magnifier  | INTEGER              |

#### `orders` Table
| field name | data type |
| ---------- | --------- |
| id         | INTEGER PRIMARY KEY GENERERATED ALWAYS AS IDENTITY |
| user_id    | FOREIGN KEY REFERENCES users(id) |
| status     | FOREIGN KEY REFERENCES statuses(id)|

#### `statuses` Table
| field name | data type |
| ---------- | --------- |
| status_name       | VARCHAR(20) PRIMARY KEY   |
| status_description| TEXT                      |

#### `orders-products` Table
| field name | data type |
| ---------- | --------- |
| id         | INTEGER PRIMARY KEY GENERERATED ALWAYS AS IDENTITY |
| order_id   | FOREIGN KEY REFERENCES orders(id) |
| product_id | FOREIGN KEY REFERENCES products(id) |
| quantity   | INTEGER |