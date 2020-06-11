<?php

require 'connect.php';

$postdata = file_get_contents("php://input");

if (isset($postdata) && !empty($postdata)) {
    $request = json_decode($postdata);
    $id = mysqli_real_escape_string($con, trim($request->id));
    $username = mysqli_real_escape_string($con, trim($request->username));
    $password = mysqli_real_escape_string($con, trim($request->password));
    $firstname = mysqli_real_escape_string($con, trim($request->firstname));
    $lastname = mysqli_real_escape_string($con, trim($request->lastname));
    $age = mysqli_real_escape_string($con, trim($request->age));
    $salary = mysqli_real_escape_string($con, trim($request->salary));

    $sql = "UPDATE `register` SET
        `username`='$username',
        `password`='$password',
        `firstname`='$firstname',
        `lastname`='$lastname',
        `age`='$age',
        `salary`='$salary'
        WHERE `id`='{$id}' LIMIT 1";

    // echo $sql;

    if (mysqli_query($con, $sql)) {
        http_response_code(204);
    } else {
        http_response_code(422);
    }
}

?>