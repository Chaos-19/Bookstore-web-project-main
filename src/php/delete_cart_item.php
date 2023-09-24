<?php

include "config.php";

try {
  session_start();

  if (!isset($_SESSION['authenticated']) || $_SESSION['authenticated'] !== true) {
    http_response_code(401); // Unauthorized status code
    echo json_encode(["authorized" => false, 'error' => 'Unauthorized']);
    exit;
  } else {

    $order_id = (int)$_GET['id'];

    $sql = "DELETE FROM Orders WHERE `Orders`.`id_order` = $order_id AND `Orders`.`customer_id`= {$_SESSION['id_user']};";

    if (mysqli_query($conn, $sql)) {
      echo json_encode([
        "result" => true,
        'message' => 'Item deleted successfully']);
    } else {
      echo json_encode([
        "result" => false,
        'message' => "Something went wrong"
      ]);
    }
  }
} catch (Exception $e) {
  echo json_encode([
    "result" => false,
    'message' => $e->getMessage()
  ]);
}

mysqli_close($conn);


?>