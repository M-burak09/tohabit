<?php
require_once("Dbconnect.php");

class Dbhandler{
    // Add all database queries, dont forget prepared statements for sql injection
    public $db;

    public function __construct($pdo){
        $this->db = $pdo;
    }

    function getAllTask(){
        
        return $this->db->query("SELECT * FROM tohabit");
    }
}


?>