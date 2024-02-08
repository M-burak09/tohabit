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

    public function getUserTodo($id){
        $sql = "SELECT * FROM task JOIN todo ON task.id = todo.task_id WHERE task.user_id = ?";
        $result = $this->db->prepare($sql);
        $result->execute([$id]);
        return $result->fetchAll(PDO::FETCH_OBJ);
    }

    public function getUserHabit($id){
        $sql = "SELECT * FROM task JOIN habit ON task.id = habit.task_id JOIN habit_instance ON habit.id = habit_instance.habit_id WHERE task.user_id = ?";
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
        $sql = "SELECT * FROM task JOIN habit ON task.id = habit.task_id JOIN habit_instance ON habit.id = habit_instance.habit_id WHERE task.user_id = ? AND habit_instance.date = ?";
        $result = $this->db->prepare($sql);
        $result->execute([$id, $date]);
        return $result->fetchAll(PDO::FETCH_OBJ);
    }

    public function createUserTodo($id, $name, $description, $date){
        $todoId = uniqueid();
        $sql = "BEGIN TRANSACTION; INSERT INTO task (id, user_id, title, description, completion) VALUES ($todoId, $id, $name, $description, 0); INSERT INTO todo (task_id, image, date) VALUES ($todoId, todo.png, $date); COMMIT TRANSACTION;";
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

