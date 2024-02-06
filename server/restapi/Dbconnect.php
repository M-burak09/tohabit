<?php

    include_once __DIR__ . "/config.php";

    class Dbconnect{
        // Creates database connection with pdo and singleton for efficiency
        private static $db;
        private $dbc;
        private function __construct(){
            try{
                $this->dbc = new PDO("mysql:host=".HOST.";dbname=".DATABASE."", USERNAME, PASSWORD);
            } catch (PDOException $e) {
                echo $e->getMessage();
            }
        }
        
        public static function getInstance(){
            if (!isset(Dbconnect::$db)) { 
				Dbconnect::$db = new Dbconnect(); 
			} 
			return Dbconnect::$db->dbc; 
        }
    }

?>
