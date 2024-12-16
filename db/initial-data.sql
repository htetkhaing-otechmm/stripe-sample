-- DROP TABLES
DROP TABLE IF EXISTS subscriptions;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS plans;


-- SQLite
CREATE TABLE users (
    id INTEGER PRIMARY KEY,
    stripeId VARCHAR,
    username VARCHAR NOT NULL,
    password VARCHAR NOT NULL
);

-- SQLite
CREATE TABLE plans (
    id INTEGER PRIMARY KEY NOT NULL,
    priceId VARCHAR NOT NULL,
    name VARCHAR NOT NULL,
    price INT NOT NULL
);

CREATE TABLE subscriptions(
  id INTEGER PRIMARY KEY ,
  userId INTEGER NOT NULL,
  planId INTEGER NOT NULL,
  subscriptionId VARCHAR NOT NULL
);

-- CREATE USERS
INSERT INTO users (username, password) VALUES ("userone@gmail.com", "12345"), ("usertwo@gmail.com", "12345");

-- CREATE plans
INSERT INTO plans (priceId, name, price) VALUES ("price_1QV5sBRtrAdVYEDOhlXC7wbC", "SILVER", 200);
INSERT INTO plans (priceId, name, price) VALUES ("price_1QVRzXRtrAdVYEDOGe5c6CJG", "GOLD", 3000);

select * from users;
select * from plans;