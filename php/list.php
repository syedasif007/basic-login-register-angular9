<?php

require 'connect.php';

error_reporting(E_ERROR);

$students = [];
$sql = "SELECT * FROM register";

if ($result = mysqli_query($con, $sql)) {
    $i = 0;

    while ($row = mysqli_fetch_assoc($result)) {
        $students[$i]['id'] = $row['id'];
        $students[$i]['username'] = $row['username'];
        $students[$i]['firstname'] = $row['firstname'];
        $students[$i]['lastname'] = $row['lastname'];
        $students[$i]['age'] = $row['age'];
        $students[$i]['salary'] = $row['salary'];
        $i++;
    }

    echo json_encode($students);
} else {
    http_response_code(404);
}

?>