drop database if exists cash_overflow;
create database cash_overflow;

use cash_overflow;

create table users (
  id serial,
  first_name varchar(255) not null,
  last_name varchar(255) not null,
  email varchar(255) not null
);

create table categories (
  id serial,
  name varchar(255) not null,
  user bigint unsigned not null,
  foreign key (user)
    references users(id)
);

create table account_types (
  id serial,
  name varchar (32) not null
);

create table allotments (
  id serial,
  user bigint unsigned not null,
  amount decimal(65, 2) not null,
  date date not null,
  category bigint unsigned not null,
  foreign key (user)
    references users(id),
  foreign key (category)
    references categories(id)
);

create table accounts (
  id serial,
  name varchar(255) not null,
  balance decimal(65, 2) not null,
  type bigint unsigned not null,
  user bigint unsigned not null,
  foreign key (type)
    references account_types(id),
  foreign key (user)
    references users(id)
);

create table transaction_types (
  id serial,
  name varchar(16)
);

create table transactions (
  id serial,
  user bigint unsigned not null,
  account bigint unsigned not null,
  type bigint unsigned not null,
  amount decimal(65, 2) not null,
  category bigint unsigned not null,
  date date not null,
  memo varchar(255),
  recurring boolean,
  foreign key (user)
    references users(id),
  foreign key (account)
    references accounts(id),
  foreign key (type)
    references transaction_types(id),
  foreign key (category)
    references categories(id)
);

insert into users (first_name, last_name, email)
  values ('Johnny', 'Cash', 'johnny.cash@cashoverflow.app');

insert into categories (name, user) values
  ('rent', 1),
  ('groceries', 1),
  ('transportation', 1),
  ('bills', 1),
  ('clothing', 1),
  ('dining out', 1),
  ('household expenses', 1),
  ('savings', 1);

insert into account_types (name) values
  ('checking'),
  ('savings'),
  ('credit');

insert into accounts (name, balance, type, user) values
  ('Ring of Fire Trust', 6500.00, 1, 1),
  ('Prison Blues Inc.', 1000.00, 2, 1),
  ('The Man Comes Around Credit Card', 400.00, 3, 1);

insert into allotments (category, user, date, amount) values
  (1, 1, '2019-09-01', 1500),
  (2, 1, '2019-09-01', 200),
  (3, 1, '2019-09-01', 200),
  (4, 1, '2019-09-01', 600),
  (5, 1, '2019-09-01', 500),
  (6, 1, '2019-09-01', 300),
  (7, 1, '2019-09-01', 200),
  (8, 1, '2019-09-01', 3000);

insert into transaction_types (name) values
  ('debit'),
  ('credit');

insert into transactions
  (user, account, type, amount, category, date, memo, recurring) values
  (1, 1, 1, 1500, 1, '2019-09-01', 'property mgmt', false),
  (1, 1, 1, 50, 2, '2019-09-01', 'heb', false),
  (1, 1, 1, 125, 4, '2019-09-01', 'collectors', false),
  (1, 1, 1, 225, 5, '2019-09-01', 'collectors', false),
  (1, 1, 1, 100, 6, '2019-09-01', 'uniqlo', false),
  (1, 1, 1, 25, 7, '2019-09-01', 'cleaning supplies', false);
