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
      "SELECT Orders.*,order_item. *,Customer.customer_id, Customer.customer_email,Customer.customer_name FROM Orders JOIN order_item ON Orders.id_order = order_item.order_id JOIN Customer ON Orders.customer_id = Customer.id_customer;";
  }

  $result = mysqli_query($conn, $sql);

  if (mysqli_num_rows($result) > 0) {
    $result_items = [];
    while ($row = mysqli_fetch_assoc($result)) {
      if (isset($row["order_date"])) {
        $row["order_date"] = date("d/m/Y", strtotime($row["order_date"]));
      }
      $result_items[] = $row;
    }

    echo json_encode([
      "status" => "success",
      "message" => "Request was successfule",
      "result" => $result_items,
    ]);
  } else {
    echo json_encode([
      "status" => "success",
      "message" => "user doesn't make order yet",
      "result" => [],
    ]);
  }
} catch (Exception $e) {
  echo json_encode(["status" => "error", "error message" => $e->getMessage()]);
}
mysqli_close($conn);
?>
