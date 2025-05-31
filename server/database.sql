create DATABASE perntodo;

-- Users table for authentication
create table users(
    user_id serial primary key,
    email varchar(255) not null unique,
    password varchar(255) not null,
    created_at timestamp with time zone default current_timestamp
);

-- Modified todo table with user reference and task scheduling features
create table todo(
    todo_id serial primary key,
    user_id integer references users(user_id),
    description varchar(255),
    deadline_date date,
    deadline_time time,
    repeat_frequency varchar(20) check (repeat_frequency in ('none', 'daily', 'weekly', 'monthly')) default 'none' not null,
    created_at timestamp with time zone default current_timestamp
);