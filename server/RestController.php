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
