# Storefront Backend Project

This repository is a submission for the second project of Udacity & FWD's Advanced Web Developement nanodegree.
Please do not use the code within for commercial purposes, read LICENSE.txt if in doubt.

## Table of Contents

- [Setting up the database](#setting-up-the-database)
  - [With Docker](#with-docker)
  - [Locally](#locally)
- [Application Settings](#application-settings)
  - [Ports](#ports)
  - [Environment Variables](#environment-variables)
- [Installation](#installation)
- [Scripts](#scripts)
- [Usage](#usage)
  - [Create a new user](#create-a-new-user)
  - [Loggin in with a user](#logging-in-with-a-user)
  - [Using JWT token](#using-jwt-token)
  - [Creating a product](#creating-a-product)
  - [Adding an order](#adding-an-order)
  - [Adding a product to current order]

## Setting up the database

### With Docker

- Write the variables needed inside `docker-compose.yml` in your `.env` file.
- Run `docker compose up -d` inside your terminal.

If you ommit `DB_PORT` the app will default to port 5432.

### Locally

Log in to `psql` on your temrinal with a superuser and run the following commands:

- `CREATE DATABASE yourdbname;`
- `CREATE USER yourusername WITH PASSWORD 'yourpassword';`
- `GRANT ALL PRIVILEGES ON DATABASE yourdbname TO yourusername;`
- `ALTER USER yourusername CREATEDB;`

## Application Settings

### Ports

- The default port for database is 5432, but you can set it using the `DB_PORT` env variable.
- The default port for the application is 3000, but you can set it using the `APP_PORT` env variable.

### Environment Variables

The `.env.sample` file has all the environment variables the app needs, Set them to work on your environment and rename it to `.env`, for example this was my `.env` :
```
# Database
DB_USERNAME=storefront_admin
DB_PASSWORD=z6Aqsrwu7F3LSWTX
DB_NAME=storefront
TEST_DB_NAME=storefront_test
DB_PORT=5151

# Application
APP_PORT=3000
ENV=dev

# Hashing
SALT_ROUNDS=10
BCRYPT_SECRET=bcryptsecret

# Authentication
JWT_SECRET=jwtsecret
```

## Installation

To set up the application run:
- `yarn install` or `npm install`
- `yarn build` or `npm run build`
- `yarn test` or `npm run test`

after setting up the database run:
- `yarn migrate-up` or `npm run migrate-up`
- `yarn seed` or `npm run seed`

To start the application:
- `yarn start` or `npm run start`

## Scripts

- `build`: Complies the source code.
- `watch`: Watches for changes in the source code and compiles them.
- `test`: Run all test suites.
- `start`: Start the application.
- `lint`: Formats the source code, and checks for linting problems and fixes them if possible.
- `migrate-up`: Runs all migrations
- `seed`: Provides essential values for the database

### Usage

## Create a new user
The endpoint `POST /users` expects a request body in this form:
```
{
  first_name: string,
  last_name: string,
  password: string,
  email: string
}
```
and will respond with a jwt token that you can use on subsequent requests.

## Logging in with a user
The endpoint `POST /users/login` expects a request body in this form:
```
{
  email: string,
  password: string
}
```
and will respond with a jwt token that you can use on subsequent requests.

## Using JWT token
Append the token at the `Authorization` header like so:
```Authorization: Bearer ...token...```

## Creating a product
The endpoint `POST /products` expects a request body in this form:
```
{
  product_name: string,
  category: string,
  price: number,
  currency: string
}
```
The seed script gives you an initial three categories: Grocery, Sports and Technology. you can add more through the database.
It also gives you an initial currency: USD, the application should be able to handle multiple currencies but this is the only tested one.

## Adding an order
The endpoint `POST /orders` only expects a jwt token with the user id, there can't be more than one active order for each user, currently you have to delete or set status to completed through the database if you want to request it more than once.

## Adding a product to current order
The endpoint `POST /products/:id` expects a request body in this form
```
{
  quantity: number
}
```
and will add a product to the current active order.
Expects JWT token in Authorization header.