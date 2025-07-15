CREATE DATABASE perntodo;

CREATE TABLE todo(
    todo_id SERIAL PRIMARY KEY, 
    name VARCHAR(255)
    description VARCHAR(255)
)