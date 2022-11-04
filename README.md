# Storefront Backend Project

This repository is a submission for the second project of Udacity & FWD's Advanced Web Developement nanodegree.
Please do not use the code within for commercial purposes, read LICENSE.txt if in doubt.

## Table of Contents

- [Setting up the database](#setting-up-the-database)
  - [With Docker](#with-docker)
  - [Locally](#locally)

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