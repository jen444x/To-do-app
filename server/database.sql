CREATE DATABASE todo_app;

CREATE TABLE users(
    user_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50),
    user_email VARCHAR(255) NOT NULL,
    user_password VARCHAR(255) NOT NULL
);

CREATE TABLE todo(
    todo_id SERIAL PRIMARY KEY, 
    name VARCHAR(255) NOT NULL,
    description TEXT
)