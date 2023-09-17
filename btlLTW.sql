create database test1;
use test1;
create table book(
	id int not null primary key AUTO_INCREMENT,
	title varchar(255) not null,
    author varchar(255) not null,
    description varchar(255),
    release_date date not null,
    total_page int,
    category varchar(255),
    sold int default 0,
    img_path varchar(255)
);


create table user(
id INT NOT NULL AUTO_INCREMENT primary key,
    surname varchar(255),
    name varchar(255) not null,
    dob date,
    role varchar(255) default "USER",
    gender int default 0,
    account varchar(255) not null ,
    password varchar(255) not null
);
insert into user
values 
	(1,'a','aaa','2010-10-10',1,'abc@','123');
    

create table history(
	id int  AUTO_INCREMENT primary key,
    book_id int not null,
    user_id int not null,
    amount int not null,
    date date,
    foreign key(book_id) references book(id) on delete cascade,
    foreign key(user_id) references user(id) on delete cascade
);
select * from history;

create table comment(
	id int  AUTO_INCREMENT primary key,
    book_id int not null,
    user_id int not null,
    cmt varchar(1000),
    star int ,
    date date,
    foreign key(book_id) references book(id) on delete cascade,
    foreign key(user_id) references user(id) on delete cascade
);
select * from comment;