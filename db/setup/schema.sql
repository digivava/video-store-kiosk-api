DROP TABLE IF EXISTS movies;
CREATE TABLE movies(
  id serial PRIMARY KEY,
  title text,
  overview text,
  release_date date,
  inventory integer
);

CREATE INDEX movies_title on movies (title);

DROP TABLE IF EXISTS customers;
CREATE TABLE customers(
  id serial PRIMARY KEY,
  name text,
  registered_at timestamp,
  address text,
  city text,
  state text,
  postal_code text,
  phone text,
  account_credit NUMERIC
);
