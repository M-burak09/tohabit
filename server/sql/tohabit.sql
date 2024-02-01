CREATE TABLE Person(
	id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50),
    password VARCHAR(50),
    email VARCHAR(50)
);

CREATE TABLE Task(
	id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    title VARCHAR(50),
    description TEXT,
    completion TINYINT,
    label int(10)
);

CREATE TABLE Todo(
	id INT PRIMARY KEY AUTO_INCREMENT,
    task_id INT NOT NULL,
    image VARCHAR(255),
    date DATE
);

CREATE TABLE Habit(
	id INT PRIMARY KEY AUTO_INCREMENT,
    task_id INT NOT NULL,
    image VARCHAR(255),
    start_date DATE,
    day_of_week INT(10)
);

CREATE TABLE Habit_instance(
	id INT PRIMARY KEY AUTO_INCREMENT,
    habit_id int NOT NULL,
    occurence_date DATE
);
