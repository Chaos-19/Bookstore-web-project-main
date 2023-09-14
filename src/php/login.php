<?php
include 'config.php';
http_response_code(200);
header('Content-Type: application/json; charset = utf-8');
$email = mysqli_real_escape_string($conn, $_POST['email']);
$password = mysqli_real_escape_string($conn, $_POST['password']);
$role = mysqli_real_escape_string($conn, $_POST['role']);

if (!empty($email) && !empty($password)) {



  $result = $role == "user"? mysqli_query($conn,
    "SELECT * FROM Customer WHERE customer_email = '{$email}'"): mysqli_query($conn, "SELECT * FROM admin WHERE admin_email = '{$email}'");

  if (mysqli_num_rows($result) > 0) {
    $row = mysqli_fetch_assoc($result);
    if (!empty($role) && $role == "user") {
      $test = password_verify($password, $row['customer_password']);
      if ($test) {
        session_start();
        $_SESSION['authenticated'] = true;
        $_SESSION['id_user'] = $row['id_customer'];
        $_SESSION['user_id'] = $row['customer_id'];
        $_SESSION['user_name'] = $row['customer_name'];
        $_SESSION['user_email'] = $row['customer_email'];
        $responseData = [
          'role' => 'customer',
          'status' => 'success',
          'user' => true,
          'verified' => $test,
          'message' => 'Request processed successfully',
          'data' => json_encode($row),
        ];
        echo json_encode($responseData);
      } else {
        $responseData = [
          'role' => 'customer',
          'status' => 'success',
          'user' => true,
          'verified' => $test,
          'message' => 'Request processed successfully',
          'data' => json_encode(['message' => 'incorrect password', "pass" => $password])
        ];
        echo json_encode($responseData);
      }
    }if (!empty($role) && $role == "admin") {
      $test = password_verify($password, $row['admin_password']);
      if ($test) {
        session_start();
        $_SESSION['authenticated'] = true;
        $_SESSION['admin_id'] = $row['admin_id'];
        $_SESSION['admin_name'] = $row['admin_name'];
        $_SESSION['admin_email'] = $row['admin_email'];
        $responseData = [
          'role' => 'admin',
          'status' => 'success',
          'user' => true,
          'verified' => $test,
          'message' => 'Request processed successfully',
          'data' => json_encode($row),
        ];
        echo json_encode($responseData);
      } else {
        $responseData = [
          'role' => 'admin',
          'status' => 'success',
          'user' => true,
          'verified' => $test,
          'message' => 'Request processed successfully',
          'data' => json_encode(['message' => 'Incorrect password', "pass" => $password])
        ];
        echo json_encode($responseData);
      }
    }
  } else {
    $responseData = [
      'role' => $role,
      'status' => 'success',
      'user' => false,
      'verified' => false,
      'message' => "User doesn't exist",
      'data' => json_encode([
        'message' => "User doesn't exist",
      ]),
    ];
    echo json_encode($responseData);
  }
} else {
  echo "empty fields ";
}
mysqli_close($conn);

/*
include 'config.php';
http_response_code(200);
header('Content-Type: application/json; charset = utf-8');
$email = mysqli_real_escape_string($conn, $_POST['email']);
$password = mysqli_real_escape_string($conn, $_POST['password']);
$role = mysqli_real_escape_string($conn, $_POST['role']);

if (!empty($email) && !empty($password)) {
  $result = mysqli_query($conn, "SELECT * FROM User WHERE Email='{$email}' AND Role='$role'");
  if (mysqli_num_rows($result) > 0) {
    $row = mysqli_fetch_assoc($result);
    $test = password_verify($password, $row['Password']);
    if ($test) {
      $responseData = [
        'status' => 'success',
        'user' => true,
        'verified' => $test,
        'message' => 'Request processed successfully',
        'data' => json_encode($row),
      ];
      echo json_encode($responseData);
    } else {
      $responseData = [
        'status' => 'success',
        'user' => true,
        'verified' => $test,
        'message' => 'Request processed successfully',
        'data' => json_encode(['message' => 'incorrect password', "pass" => $password])
      ];
      echo json_encode($responseData);
    }
  } else {
    $responseData = [
      'status' => 'success',
      'user' => false,
      'verified' => false,
      'message' => 'Request processed successfully',
      'data' => "User doesn't exist",
    ];
    echo json_encode($responseData);
  }
} else {
  echo "empty fields ";
}
mysqli_close($conn);

*/
?>