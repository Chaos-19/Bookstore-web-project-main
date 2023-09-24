<?php
include "config.php";
try {
  session_start();
  if (
    !isset($_SESSION["authenticated"]) ||
    $_SESSION["authenticated"] !== true
  ) {
    http_response_code(401); // Unauthorized status code
    echo json_encode([
      "authorized" => false,
      "status" => "error",
      "error message" => "Unauthorized",
    ]);
  } else {
    $sql =
      "SELECT (SELECT COUNT(book_id) FROM Book) as Book_count,(SELECT COUNT(order_id) FROM Orders) as Order_count,(SELECT COUNT(customer_id) FROM Customer) as Customer_count;";
  }

  $result = mysqli_query($conn, $sql);

  if (mysqli_num_rows($result) > 0) {
    $result_items = [];
    while ($row = mysqli_fetch_assoc($result)) {
      $result_items[] = $row;
    }

    echo json_encode([
      "status" => "success",
      "message" => "Request was successfule",
      "result" => $result_items,
    ]);
  } else {
    echo json_encode([
      "status" => "error",
      "message" => "user doesn't make order yetSomething went Wrong",
      "result" => [],
    ]);
  }
} catch (Exception $e) {
  echo json_encode([
    "status" => "error",
    "error message" => $e->getMessage(),
  ]);
}
mysqli_close($conn);
?>
