<?php
    require_once("SimpleRest.php");
    require_once("Dbhandler.php");

    class TaskRestHandler extends SimpleRest{
        // Add functions that turns sql data into encoded json data and vice versa
        public $db;

        public function __construct($db){
            $this->db = new Dbhandler($db);
        }

        // Checks if query is valid or not
        private static function getStatusCodeAndResponse($query_result){
            $call_has_succeeded = !empty($query_result);
            return $call_has_succeeded ? [200, $query_result] : [404, ["success" => false]];
        }

        // Gives json and status as header
        private function handleAndEncode($db_call){
            [$status, $response] = self::getStatusCodeAndResponse($db_call);
            $this->setHttpHeaders("application/json", $status);
            echo json_encode($response);
        }

        // Encodes rawdata to json data
        public function encodeJson($responseData) {
            $jsonResponse = json_encode($responseData);
            return $jsonResponse;		
        }

        // Start of resthandler functions

        function getAllTasks(){
            $this->handleAndEncode($this->db->getAllTask());
        }

        function getUserTodos($id){
            $this->handleAndEncode($this->db->getUserTodo($id));
        }
        

        function getUserLogin($username, $password){
            /*
            $this->handleAndEncode($this->db->getUserLogin($username, $password));
            
            foreach ($getUser as $row) {
				return True;
			}
			return False; */
            $user = $this->db->getUserLogin($username, $password);

        if (!empty($user)) {
            $this->handleAndEncode(["success" => true, "user" => $user]);
            return true;
        } else {
            $this->handleAndEncode(["success" => false, "message" => "Invalid username or password"]);
            return false;
        }
        }
		
        
    }
?>