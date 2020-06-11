<?php

// header('Access-Control-Allow-Origin: *');
// header("Access-Control-Allow-Methods: HEAD, GET, POST, PUT, PATCH, DELETE, OPTIONS");
// header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method,Access-Control-Request-Headers, Authorization");
// header('Content-Type: application/json');

// $method = $_SERVER['REQUEST_METHOD'];

// if ($method == "OPTIONS") {
//     header('Access-Control-Allow-Origin: *');
//     header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method,Access-Control-Request-Headers, Authorization");
//     header("HTTP/1.1 200 OK");
//     // die();
// }

require 'connect.php';

// error_reporting(E_ERROR);

$token = null;
// $headers = apache_request_headers();
$postdata = file_get_contents("php://input");

if (isset($postdata) && !empty($postdata)) {
    $request = json_decode($postdata);
    $username = mysqli_real_escape_string($con, trim($request->username));
    $password = mysqli_real_escape_string($con, trim($request->password));

    $sql = "SELECT COUNT(*) as count FROM register WHERE `username`='{$username}' AND `password`='{$password}'";

    if ($result = mysqli_query($con, $sql)) {

        while ($row = mysqli_fetch_assoc($result)) {
            if ($row['count'] == 1) {
                echo json_encode (
                    array (
                        "message" => "Login Successful",
                        "token" => "Bearer-jsdfnkj223",
                        "email" => $username
                    )
                );

                http_response_code(200);
                exit;
            }
        }
    }

    // http_response_code(401);
    echo json_encode(
        array (
            "message" => "Login Failed"
        )
    );
} else {
    // http_response_code(404);
    echo json_encode(
        array (
            "message" => "Invalid Request"
        )
    );
}

?>