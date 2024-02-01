<?php
    require_once("SimpleRest.php");
    require_once("Dbhandler.php");

    class TaskRestHandler extends SimpleRest{
        public $db;

        public function __construct($db){
            $this->db = new Dbhandler($db);
        }

        function getAllTasks(){
            return $this->db->getAllTask();	
        }
        // Add functions that turns sql data into encoded json data and vice versa
    }
?>