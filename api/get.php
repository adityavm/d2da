<?php
	$config = json_decode(file_get_contents("config.json"), true);
	$data = json_decode(file_get_contents("php://input"), true);

	$match = (isset($data["match"]) && $data["match"] != 0) ? $data["match"] : 342623939;
	$match = file_get_contents("https://api.steampowered.com/IDOTA2Match_570/GetMatchDetails/v0001/?key={$config['key']}&match_id=$match");
	echo $match;
?>