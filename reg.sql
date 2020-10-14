create table towns(
	id serial not null primary key,
	town_name text not null,
        loc text not null
);

create table regNumbers (
	id serial not null primary key,
        reg text not null,
	town_id int,
	foreign key (town_id) references towns(id)
);
