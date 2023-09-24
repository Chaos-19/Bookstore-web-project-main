<?php
include "config.php";
try {
  if (
    isset(
      $_POST["name"],
      $_POST["email"],
      $_POST["phone"],
      $_POST["message"],
      $_POST["title"]
    )
  ) {
    $id = 0;
    $name = mysqli_real_escape_string($conn, $_POST["name"]);
    $email = mysqli_real_escape_string($conn, $_POST["email"]);
    $phone = mysqli_real_escape_string($conn, $_POST["phone"]);
    $title = mysqli_real_escape_string($conn, $_POST["title"]);
    $message = mysqli_real_escape_string($conn, $_POST["message"]);

    $stmt = $conn->prepare(
      "INSERT INTO `Customer_Complaints`(`complaint_id`, `Name`, `Email`, `Phone`, `Title`, `complaint_message`) VALUES (?,?,?,?,?,?)"
    );

    $stmt->bind_param("isssss", $id, $name, $email, $phone, $title, $message);

    $stmt->execute();

    echo json_encode([
      "status" => "success",
      "message" => "you have successfully submited your complaint ",
    ]);
  } else {
    echo json_encode([
      "status" => "error",
      "message" => "empty fields",
    ]);
  }
} catch (Exception $e) {
  echo json_encode([
    "status" => "error",
    "message" => $e->getMessage(),
  ]);
}
?>
