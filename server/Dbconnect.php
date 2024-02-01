<?php

    class Dbconnect{
        // Add db connection, dont forget pdo and singeleton
        static $db;
        private $dbc;
        public function __construct(){
            try{
                $this->dbc = new PDO("mysql:host=localhost;dbname=tohabit", "root", "");
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
