<?php

require 'connect.php';

$postdata = file_get_contents("php://input");

if (isset($postdata) && !empty($postdata)) {
    $request = json_decode($postdata);
    $username = mysqli_real_escape_string($con, trim($request->username));
    $password = mysqli_real_escape_string($con, trim($request->password));
    $firstname = mysqli_real_escape_string($con, trim($request->firstname));
    $lastname = mysqli_real_escape_string($con, trim($request->lastname));
    $age = mysqli_real_escape_string($con, trim($request->age));
    $salary = mysqli_real_escape_string($con, trim($request->salary));

    $sql = "INSERT INTO `register` (
        `username`,
        `password`,
        `firstname`,
        `lastname`,
        `age`,
        `salary`
    ) VALUES (
        '{$username}',
        '{$password}',
        '{$firstname}',
        '{$lastname}',
        '{$age}',
        '{$salary}'
    )";

    if (mysqli_query($con, $sql)) {
        http_response_code(201);
    } else {
        http_response_code(422);
    }
}

?>