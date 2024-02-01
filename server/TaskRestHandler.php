<?php
    require_once("SimpleRest.php");
    require_once("Dbhandler.php");

    class TaskRestHandler extends SimpleRest{
        public $db;

        public function __construct($db){
            $this->db = new Dbhandler($db);
        }

        function getAllTasks(){
            $rawData = $this->db->getAllTask();

            if(empty($rawData)) {
                $statusCode = 404;
                $rawData = array('error' => 'No tasks found!');		
            } else {
                $statusCode = 200;
            }
    
            $requestContentType = $_SERVER['HTTP_ACCEPT'];
            $this->setHttpHeaders('application/json', $statusCode);
            $response = $this->encodeJson($rawData);
            echo $response;
        }
        public function encodeJson($responseData) {
            $jsonResponse = json_encode($responseData);
            return $jsonResponse;		
        }
            //var_dump($this->db->getAllTask());
           // return $this->db->getAllTask();	

		
        // Add functions that turns sql data into encoded json data and vice versa
    }
?>