INSERT INTO `Person` (`id`, `username`, `password`, `email`) VALUES
(1, 'guest', 'guest', 'guest@example.com'),
(2, 'test', 'test', 'test@example.com'),
(3, 'burak', 'burak', 'burak@example.com');

INSERT INTO `Task` (`id`, `user_id`, `title`, `description`, `completion`, `label`) VALUES
(1, 1, 'Programming', 'Finish my project', 0, NULL),
(2, 1, 'Cook', 'Cook my meal', 0, NULL),
(3, 2, 'Sporting', 'Go to the gym', 0, NULL);

INSERT INTO `Todo` (`id`, `task_id`, `image`, `date`) VALUES
(2, 2, 'todo.png', '2024-6-9'),
(3, 3, 'todo.png', '2024-3-2');

INSERT INTO `Habit` (`id`, `task_id`, `image`, `start_date`, `day_of_week`) VALUES
(1, 1, 'habit.png', '2024-1-8', 5);

INSERT INTO `Habit_instance` (`id`, `habit_id`, `occurence_date`) VALUES
(1, 1, '2024-1-8'),
(2, 1, '2024-1-15'),
(3, 1, '2024-1-22');