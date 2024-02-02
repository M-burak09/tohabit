<?php
require_once("MobileRestHandler.php");
require_once("TaskRestHandler.php");
require_once("Dbconnect.php");

header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Max-Age: 86400');
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header('Access-Control-Allow-Headers: token, Content-Type');

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
			echo "ewer".$username;
			// Validate and process login
			if (!empty($username) && !empty($password)) {
				$mobileRestHandler = new TaskRestHandler(Dbconnect::getInstance());
				$mobileRestHandler->getUserLogin($username, $password);
			} else {
				// Handle invalid or missing data
				echo json_encode(array('error' => 'Invalid or missing username or password.'));
			}
		} else {
			// Handle invalid request method
			echo json_encode(array('error' => 'Invalid request method.'));
		}
		break;
	case "loginn":
		$taskRestHandler = new TaskRestHandler(Dbconnect::getInstance());
		$taskRestHandler->getUserLogin($username, $password);
		break;

	case "all":
		// to handle REST Url /mobile/list/
		$mobileRestHandler = new MobileRestHandler();
		$mobileRestHandler->getAllMobiles();
		break;
		
	case "single":
		// to handle REST Url /mobile/show/<id>/
		$mobileRestHandler = new MobileRestHandler();
		$mobileRestHandler->getMobile($_GET["id"]);
		break;

	case "" :
		//404 - not found;
		break;
}
?>
