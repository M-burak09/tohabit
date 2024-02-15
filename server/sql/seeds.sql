INSERT INTO `Person` (`id`, `username`, `password`, `email`) VALUES
(1, 'guest', 'guest', 'guest@example.com'),
(2, 'test', 'test', 'test@example.com'),
(3, 'burak', 'burak', 'burak@example.com');

INSERT INTO `Task` (`id`, `user_id`, `title`, `description`, `label`) VALUES
(1, 1, 'Programming', 'Finish my project', NULL),
(2, 1, 'Cook', 'Cook my meal', NULL),
(3, 2, 'Sporting', 'Go to the gym', NULL);

INSERT INTO `Todo` (`id`, `task_id`, `image`, `date`, `completion`) VALUES
(2, 2, 'todo.png', '2024-6-9', 0),
(3, 3, 'todo.png', '2024-3-2', 0);

INSERT INTO `Habit` (`id`, `task_id`, `image`, `start_date`, `day_of_week`) VALUES
(1, 1, 'habit.png', '2024-1-8', NULL);

INSERT INTO `Habit_instance` (`id`, `habit_id`, `date`, `completion`) VALUES
(1, 1, '2024-1-8', 0),
(2, 1, '2024-1-15', 0),
(3, 1, '2024-1-22', 0);