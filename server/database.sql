create DATABASE perntodo;

-- Users table for authentication
create table users(
    user_id serial primary key,
    email varchar(255) not null unique,
    password varchar(255) not null,
    created_at timestamp with time zone default current_timestamp
);

-- Modified todo table with user reference
create table todo(
    todo_id serial primary key,
    user_id integer references users(user_id),
    description varchar(255),
    created_at timestamp with time zone default current_timestamp
);