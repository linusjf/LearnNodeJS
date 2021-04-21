drop table movies; 
create table if not exists movies (
  id serial primary key, 
  title varchar(50) not null, 
  year integer not null, 
  created_on timestamp not null default now());
insert into movies (title, year)
values ('Her', 2013);
insert into movies (title, year)
values ('I, Robot', 2004);
insert into movies (title, year)
values ('A.I. Artificial Intelligence', 2001);
insert into movies (title, year)
values ('2001: A Space Odyssey', 1968);
insert into movies (title, year)
values ('Blade Runner', 1982);
select count(*) from movies;
