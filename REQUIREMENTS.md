## API Endpoints
#### Products
- Index                                                       | GET  /products
- Show                                                        | GET  /products/:id (number)
- Create [token required]                                     | POST /products
- Top 5 most popular products                                 | GET  /products/popular
- Products by category (args: product category)               | GET  /products/category/:category (string)

#### Users
- Index [token required]                                      | GET  /users
- Show [token required]                                       | GET  /users/:id
- Create N[token required]                                    | POST /users

#### Orders
- Current Order by user (args: user id)[token required]       | GET  /orders/:user-id/active
- Completed Orders by user (args: user id)[token required]    | GET  /orders/:user-id/completed

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
| id              | SERIAL (PRIMARY KEY) |
| first_name      | VARCHAR(50)          |
| last_name       | VARCHAR(50)          |
| password_digest | CHAR                 |

#### `products` Table
| id              | SERIAL (PRIMARY KEY) |
| name            | VARCHAR(100)         |
| magnified_price | INTEGER              |
| currency_id     | FOREIGN KEY REFRENCES currencies(id) |
| category_id     | FOREIGN KEY REFRENCES categories(id) |

#### `categories` Table
| id              | SERIAL (PRIMARY KEY) |
| name            | VARCHAR(50)          |

#### `currencies` Table
| id              | SERIAL (PRIMARY KEY) |
| code            | CHAR(3)              |
| magnifier       | INTEGER              |