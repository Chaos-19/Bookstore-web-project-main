<?php
// Get form data
include 'config.php';

$name = $_POST['name'];
$email = mysqli_real_escape_string($conn, $_POST['email']);

// Perform any necessary processing with the form data

if ($email) {
  $result = mysqli_query($conn, "SELECT * FROM Customer WHERE customer_email ='{$email}'");
  if (mysqli_num_rows($result) > 0) {
    http_response_code(200);
    header('Content-Type: application/json; charset=utf-8');
    $responseData = [
      'status' => 'success',
      'user' => true,
      'message' => 'Request processed successfully',
      'data' => json_encode(mysqli_fetch_assoc($result)),
    ];

    echo json_encode($responseData);
  } else {
    $responseData = [
      'status' => 'success',
      'user' => false,
      'message' => 'Request processed successfully',
      'data' => "User doesn't exist",
    ];
    echo json_encode($responseData);
  }
}

// Return a response

?>