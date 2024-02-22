<?php
require_once("Dbconnect.php");

class Dbhandler{
    // All database queries with prepared statements to avoid sql injection
    private $db;

    public function __construct($pdo){
        $this->db = $pdo;
    }
		
    public function getAllTask(){
        $sql = "SELECT * FROM task";
        $result = $this->db->query($sql)->fetchAll(PDO::FETCH_OBJ);
        return $result;
    }

    public function getUserTasks($id){
        $sql = "SELECT * FROM task WHERE user_id = ?";
        $result = $this->db->prepare($sql);
        $result->execute([$id]);
        return $result->fetchAll(PDO::FETCH_OBJ);
    }

    public function getUserTodo($id){
        $sql = "SELECT * FROM task JOIN todo ON task.id = todo.task_id WHERE task.user_id = ?";
        $result = $this->db->prepare($sql);
        $result->execute([$id]);
        return $result->fetchAll(PDO::FETCH_OBJ);
    }

    public function getUserHabit($id){
        $sql = "SELECT * FROM task JOIN habit ON task.id = habit.task_id JOIN habit_instance ON habit.task_id = habit_instance.habit_id WHERE task.user_id = ?";
        $result = $this->db->prepare($sql);
        $result->execute([$id]);
        return $result->fetchAll(PDO::FETCH_OBJ);
    }

    public function getUserTodosDate($id, $date){
        $sql = "SELECT * FROM task JOIN todo ON task.id = todo.task_id WHERE task.user_id = ? AND todo.date = ?";
        $result = $this->db->prepare($sql);
        $result->execute([$id, $date]);
        return $result->fetchAll(PDO::FETCH_OBJ);
    }

    public function getUserHabitsDate($id, $date){
        $sql = "SELECT * FROM task JOIN habit ON task.id = habit.task_id JOIN habit_instance ON habit.task_id = habit_instance.habit_id WHERE task.user_id = ? AND habit_instance.date = ?";
        $result = $this->db->prepare($sql);
        $result->execute([$id, $date]);
        return $result->fetchAll(PDO::FETCH_OBJ);
    }

    public function createUserTodo($id, $name, $description, $date){
        $todoId = time();
        // Add data to task table
        $sql = "INSERT INTO task (id, user_id, title, description) VALUES (?, ?, ?, ?);";
        $result = $this->db->prepare($sql);
        $result->execute([$todoId, $id, $name, $description]);
        
        // Add data to todo table
        $sql= "INSERT INTO todo (id, task_id, image, date, completion) VALUES (?, ?, 'todo.png', ?, 0)";
        $result = $this->db->prepare($sql);
        $result->execute([$todoId, $todoId, $date]);
    }

    public function createUserHabit($id, $name, $description, $dayOfWeek, $startDate, $endDate){
        $todoId = time();
        // Add data to task table
        $sql = "INSERT INTO task (id, user_id, title, description) VALUES (?, ?, ?, ?);";
        $result = $this->db->prepare($sql);
        $result->execute([$todoId, $id, $name, $description]);
        
        // Add data to todo table
        $sql= "INSERT INTO habit (task_id, image, start_date, day_of_week) VALUES (?, 'habit.png', ?, ?)";
        $result = $this->db->prepare($sql);
        $result->execute([$todoId, $startDate, $dayOfWeek]);

        // Add single instances between start and end date on specific day of the week
        $newEndDate = $endDate;
        $newStartDate = $startDate;
        while(true){
            if(strtotime($newStartDate) > strtotime($newEndDate)){
                break;
            } else {
                $sql= "INSERT INTO habit_instance (habit_id, date, completion) VALUES (?, ?, 0)";
                $result = $this->db->prepare($sql);
                $result->execute([$todoId, $newStartDate]);
                var_dump($newStartDate);
                $newStartDate = date("Y-m-d", strtotime($newStartDate. ' + 7 days'));
            }
        }
    }

    public function editUserTask($id, $taskId, $taskName, $taskDescription){
        $sql = "UPDATE task SET title = ?, description = ? WHERE id = ? AND user_id = ?";
        $result = $this->db->prepare($sql);
        return $result->execute([$taskName, $taskDescription, $taskId, $id]);
    }

    public function putUserTaskCompletion($id, $taskId, $completion){
        // First check if the task is a todo or a habit by checking if todo query returns a value
        $sqlTaskCheck = "SELECT * FROM todo WHERE task_id = ?";
        $resultTaskCheck = $this->db->prepare($sqlTaskCheck);
        $resultTaskCheck->execute([$taskId]);
        $value = $resultTaskCheck->fetchColumn();
        // If fetchcolumn returns a value aka an integer then it is a todo, otherwise it is a habit
        if(is_int($value)){
            $sql = "UPDATE todo JOIN task ON task.id = todo.task_id SET completion = ? WHERE todo.id = ? AND task.user_id = ?";
        } else {
            $sql = "UPDATE habit JOIN task ON task.id = habit.task_id JOIN habit_instance ON habit.task_id = habit_instance.habit_id SET completion = ? WHERE habit_instance.id = ? AND task.user_id = ?";
        }
        $result = $this->db->prepare($sql);
        return $result->execute([$completion, $taskId, $id]);
    }

    public function getUserLogin($username, $password){
        $sql = "SELECT * FROM person WHERE username = ? AND password = ?";
        try {
            $result = $this->db->prepare($sql);
            $result->execute([$username, $password]);
            $user = $result->fetch(PDO::FETCH_ASSOC);
            return $user !== false ? $user : null;
        } catch (PDOException $e) {
            return null;
        }
    }
}


?>

