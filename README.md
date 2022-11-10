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

## Application Settings

### Ports

- The default port for database is 5432, but you can set it using the `DB_PORT` env variable.
- The default port for the application is 3000, but you can set it using the `APP_PORT` env variable.

### Environment Variables

The `.env.sample` file has all the environment variables the app needs, Set them to work on your environment and rename it to `.env`.

## Installation

To set up the application run:
- `yarn install` or `npm install`
- `yarn build` or `npm run build`
- `yarn test` or `npm run test`

To start the application:
- `yarn start` or `npm run start`

## Scripts

- `build`: Complies the source code.
- `watch`: Watches for changes in the source code and compiles them.
- `test`: Run all test suites.
- `start`: Start the application.
- `lint`: Formats the source code, and checks for linting problems and fixes them if possible.