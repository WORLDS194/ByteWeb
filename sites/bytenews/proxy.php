<?php
// Define the API URL
$url = 'https://newsapi.org/v2/top-headlines?country=us&apiKey=94134206381d41e39aa4031b263a0bfb';

// Use file_get_contents to fetch the data
$response = file_get_contents($url);

// Tell the browser the content is JSON
header('Content-Type: application/json');

// Send the data to your HTML page
echo $response;
?>