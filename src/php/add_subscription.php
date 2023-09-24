<?php

include "config.php";

try {
  $json_data = file_get_contents("php://input");

  $data = json_decode($json_data, true);

  if (!empty($data["email"])) {
    $customer_email = mysqli_real_escape_string($conn, $data["email"]);
    $subscriber_id = "CUSTOMER" . bin2hex(random_bytes(5));
    if (
      mysqli_query(
        $conn,
        "INSERT INTO Subscribers VALUES (0,'$subscriber_id','$customer_email')"
      )
    ) {
      echo json_encode([
        "status" => "success",
        "message" => "you successfully Subscriberied",
      ]);
    } else {
      echo json_encode([
        "status" => "error",
        "errorMasage" => "Something went wrong !!",
        "message" => "subscriberibtion faild",
      ]);
    }
  }
} catch (Exception $e) {
  echo json_encode([
    "status" => "error",
    "error message" => $e->getMessage(),
  ]);
}

?>
