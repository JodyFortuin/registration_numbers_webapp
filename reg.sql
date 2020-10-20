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
insert into towns (id, town_name, loc) values (1, 'Cape Town', 'CA');
insert into towns (id, town_name, loc) values (2, 'Bellville', 'CY');
insert into towns (id, town_name, loc) values (3, 'Stellenbosch', 'CL');

