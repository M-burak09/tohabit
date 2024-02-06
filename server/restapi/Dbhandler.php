<?php
require_once("Dbconnect.php");

class Dbhandler{
    // Add all database queries, dont forget prepared statements for sql injection
    public $db;

    public function __construct($pdo){
        $this->db = $pdo;
    }
		
    function getAllTask(){
        $sql = "SELECT * FROM task";
        $result = $this->db->query($sql)->fetchAll(PDO::FETCH_OBJ);
        return $result;
    }

    function getUserTodo($id){
        //$sql = "SELECT * FROM task where user_id = ?";
        $sql = "SELECT * FROM task INNER JOIN todo ON task.id = todo.task_id WHERE task.user_id = ?";
        $result = $this->db->prepare($sql);
        $result->execute([$id]);
        return $result->fetchAll(PDO::FETCH_OBJ);
    }

    function getUserLogin($username, $password){/*
        $sql = "SELECT * FROM person where username = ? AND password = ?";
        $result = $this->db->prepare($sql);
        $result->execute([$username, $password])->fetch(PDO::FETCH_ASSOC);
        return $result;*/
        $sql = "SELECT * FROM person WHERE username = ? AND password = ?";
    
    try {
        $result = $this->db->prepare($sql);
        $result->execute([$username, $password]);

        if ($result !== false) {
            $user = $result->fetch(PDO::FETCH_ASSOC);
            
            if ($user !== false) {
                // User found, return the user data
                return $user;
            } else {
                // User not found
                return null;
            }
        } else {
            // Handle query execution error
            return null;
        }
    } catch (PDOException $e) {
        // Handle any PDO exceptions
        return null;
    }
    }
}


?>

