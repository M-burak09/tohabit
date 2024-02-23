<?php
    require_once("SimpleRest.php");
    require_once("Dbhandler.php");

    class TaskRestHandler extends SimpleRest{
        // Encode database and json data + check on error codes
        private $db;

        public function __construct($db){
            $this->db = new Dbhandler($db);
        }

        // Checks if query is valid or not
        public static function getStatusCodeAndResponse($query_result){
            $call_has_succeeded = !empty($query_result);
            return $call_has_succeeded ? [200, $query_result] : [404, ["success" => false]];
        }

        // Gives json and status as header
        public function handleAndEncode($db_call){
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

        public function getAllTasks(){
            $this->handleAndEncode($this->db->getAllTask());
        }

        public function getUserTasks($id){
            $this->handleAndEncode($this->db->getUserTasks($id));
        }

        public function editUserTask($id, $taskId, $name, $description){
            $this->handleAndEncode($this->db->editUserTask($id, $taskId, $name, $description));
        }

        public function deleteUserTask($id, $taskId){
            $this->handleAndEncode($this->db->deleteUserTask($id, $taskId));
        }

        public function getUserTodos($id){
            $this->handleAndEncode($this->db->getUserTodo($id));
        }

        public function getUserHabits($id){
            $this->handleAndEncode($this->db->getUserHabit($id));
        }

        public function getUserTodosDate($id, $date){
            $this->handleAndEncode($this->db->getUserTodosDate($id, $date));
        }

        public function getUserHabitsDate($id, $date){
            $this->handleAndEncode($this->db->getUserHabitsDate($id, $date));
        }

        public function createUserTodo($id, $name, $description, $date){
            $this->handleAndEncode($this->db->createUserTodo($id, $name, $description, $date));
        }

        public function createUserHabit($id, $name, $description, $dayOfWeek, $startDate, $endDate){
            $this->handleAndEncode($this->db->createUserHabit($id, $name, $description, $dayOfWeek, $startDate, $endDate));
        }

        public function putUserTaskCompletion($id, $taskId, $completion){
            $this->handleAndEncode($this->db->putUserTaskCompletion($id, $taskId, $completion));
        }
        
        public function getUserLogin($username, $password){
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