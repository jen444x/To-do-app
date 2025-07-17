CREATE DATABASE todo_app;

CREATE TABLE todo(
    todo_id SERIAL PRIMARY KEY, 
    name VARCHAR(255) NOT NULL,
    description TEXT
)