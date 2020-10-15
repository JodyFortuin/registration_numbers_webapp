create table towns(
	id serial not null primary key,
	town_name text,
        loc text
);

create table regNumbers (
	id serial not null primary key,
        reg text,
	town_id int,
	foreign key (town_id) references towns(id)
);
