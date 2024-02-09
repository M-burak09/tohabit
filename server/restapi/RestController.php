<?php
require_once("TaskRestHandler.php");
require_once("Dbconnect.php");

// Needed CORS headers so React can communicate with different rest url
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Max-Age: 86400');
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header('Access-Control-Allow-Headers: token, Content-Type, Authorization, X-Requested-With');

$view = "";
if(isset($_GET["view"])){
	$view = $_GET["view"];
}
/*
controls the RESTful services
URL mapping
*/
switch($view){
	case "tasks":
		$taskRestHandler = new TaskRestHandler(Dbconnect::getInstance());
		$taskRestHandler->getAllTasks();
		break;
	case "login":
		// Ensure that the request method is POST
		if ($_SERVER['REQUEST_METHOD'] === 'POST') {
			// Get raw JSON data from the request body
            $json_data = file_get_contents("php://input");
            // Decode the JSON data
            $data = json_decode($json_data, true);
            // Access username and password from the decoded JSON data
            $username = isset($data['username']) ? $data['username'] : null;
            $password = isset($data['password']) ? $data['password'] : null;
			// Validate and process login
			if (!empty($username) && !empty($password)) {
				$restRestHandler = new TaskRestHandler(Dbconnect::getInstance());
				$restRestHandler->getUserLogin($username, $password);
			} else {
				echo json_encode(array('error' => 'Invalid or missing username or password.'));
			}
		} else {
			echo json_encode(array('error' => 'Invalid request method.'));
		}
		break;
	
	case "usertodos":
		$taskRestHandler = new TaskRestHandler(Dbconnect::getInstance());
		$taskRestHandler->getUserTodos($_GET["id"]);
		break;
	
	case "userhabits":
		$taskRestHandler = new TaskRestHandler(Dbconnect::getInstance());
		$taskRestHandler->getUserHabits($_GET["id"]);
		break;
	
	case "usertodosdate":
		$taskRestHandler = new TaskRestHandler(Dbconnect::getInstance());
		$taskRestHandler->getUserTodosDate($_GET["id"], $_GET["date"]);
		break;

	case "userhabitsdate":
		$taskRestHandler = new TaskRestHandler(Dbconnect::getInstance());
		$taskRestHandler->getUserHabitsDate($_GET["id"], $_GET["date"]);
		break;
	
	case "createtodo":
		
		if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $json_data = file_get_contents("php://input");
            $data = json_decode($json_data, true);
            $name = isset($data['name']) ? $data['name'] : null;
            $description = isset($data['description']) ? $data['description'] : null;
			$date = isset($data['date']) ? $data['date'] : null;
			if (!empty($name) && !empty($date)) {
				$taskRestHandler = new TaskRestHandler(Dbconnect::getInstance());
				$taskRestHandler->createUserTodo($_GET["id"], $name, $description, $date);
			} else {
				echo json_encode(array('error' => 'Invalid task creation.'));
			}
		} 
		/*
		else {
			$taskRestHandler = new TaskRestHandler(Dbconnect::getInstance());
			$taskRestHandler->createUserTodo(1, 'statictest', 'statictest', '2024-02-09');
			echo json_encode(array('error' => 'Invalid request method.'));
		}
		*/
		
		break;

	case "createhabit":

		if ($_SERVER['REQUEST_METHOD'] === 'POST') {
			error_log("Received a POST request for habit creation.");
			$json_data = file_get_contents("php://input");
			$data = json_decode($json_data, true);
			$name = isset($data['name']) ? $data['name'] : null;
			$description = isset($data['description']) ? $data['description'] : null;
			$dayOfWeek = isset($data['dayOfWeek']) ? $data['dayOfWeek'] : null;
			$startDate = isset($data['startDate']) ? $data['startDate'] : null;
			$endDate = isset($data['endDate']) ? $data['endDate'] : null;
			if (!empty($name) && !empty($dayOfWeek) && !empty($startDate)) {
				$taskRestHandler = new TaskRestHandler(Dbconnect::getInstance());
				$taskRestHandler->createUserHabit($_GET["id"], $name, $description, $dayOfWeek, $startDate, $endDate);
			} else {
				echo json_encode(array('error' => 'Invalid task creation.'));
			}
		} 
		
		else {
			$taskRestHandler = new TaskRestHandler(Dbconnect::getInstance());
			$taskRestHandler->createUserHabit(1, 'statictest', 'statictest', 6,'2024-02-09', '2024-02-23');
			echo json_encode(array('error' => 'Invalid request method.'));
		}
		
		
		break;

	case "" :
		//404 - not found;
		break;
}
?>
