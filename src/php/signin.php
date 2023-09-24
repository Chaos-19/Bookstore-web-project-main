<?php
include "config.php";

http_response_code(200);

$name = mysqli_real_escape_string($conn, $_POST['name']);
$email = mysqli_real_escape_string($conn, $_POST['email']);
$password = mysqli_real_escape_string(
  $conn,
  password_hash($_POST['password'], PASSWORD_BCRYPT)
);



if (!empty($name) &&
  !empty($email) &&
  !empty($password)) {
  $result = mysqli_query($conn, "SELECT * FROM Customer WHERE customer_email ='{$email}'");
  if (mysqli_num_rows($result) > 0) {
    $responseData = [
      'user exist' => true,
      'status' => 'success',
      'message' => "$email This email already exists",
    ];
    echo json_encode($responseData);
  } else {
    $customer_id = "USER-".bin2hex(random_bytes(5));
    $query = "INSERT INTO Customer (`id_customer`, `customer_id`, `customer_name`, `customer_email`, `customer_password`)  VALUES(0,'$customer_id','$name','$email','$password')";

    if (mysqli_query($conn, $query)) {
      $responseData = [
        'status' => 'success',
        'registered' => true,
        'message' => 'Request processed successfully',
        'data' => "User successfully Registered",
      ];
      echo json_encode($responseData);
    } else {
      $responseData = [
        'status' => 'success',
        'registered' => false,
        'message' => 'Request processed successfully',
        'data' => mysqli_errno($conn),
      ];
      echo json_encode($responseData);
    }
  }
} else {
  $responseData = [
    'status' => 'success',
    'message' => 'Request processed successfully',
    'error' => "fildes are empty",
  ];
  echo json_encode($responseData);
}
mysqli_close($conn);
?>