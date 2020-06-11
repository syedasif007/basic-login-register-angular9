<?php

require "connect.php";

$id = $_GET['id'];

$sql = "SELECT * FROM register WHERE id='{$id}' LIMIT 1";

// $result = mysqli_query($con, $sql);
// $row = mysqli_fetch_assoc($result);

// echo $json = json_encode($row);
// exit;

if ($result = mysqli_query($con, $sql)) {
    $row = mysqli_fetch_assoc($result);

    $students['id'] = $row['id'];
    $students['username'] = $row['username'];
    $students['password'] = $row['password'];
    $students['firstname'] = $row['firstname'];
    $students['lastname'] = $row['lastname'];
    $students['age'] = $row['age'];
    $students['salary'] = $row['salary'];

    echo json_encode($students);
} else {
    http_response_code(404);
}

?>