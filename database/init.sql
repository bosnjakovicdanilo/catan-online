CREATE DATABASE IF NOT EXISTS catan_db;

CREATE USER IF NOT EXISTS 'catanuser'@'%' IDENTIFIED BY 'catanpassword';
GRANT ALL PRIVILEGES ON catan_db.* TO 'catanuser'@'%';
FLUSH PRIVILEGES;

USE catan_db;

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL
);

INSERT INTO users (username, password_hash)
VALUES ('admin', 'admin')
ON DUPLICATE KEY UPDATE username=username;
