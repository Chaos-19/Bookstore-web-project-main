<?php
include "config.php";

try {
  session_start();
  $result = mysqli_query($conn, "SELECT id_customer FROM Customer WHERE customer_id = '{$_SESSION['user_id']}'");

  $id_customer = "";

  if (mysqli_num_rows($result) > 0)
    $id_customer = mysqli_fetch_assoc($result)['id_customer'];

  $sql = "SELECT SUM(order_item.quantity) AS cart_item_count  ,SUM(order_item.sub_total) as total_cost FROM  Orders JOIN order_item ON Orders.id_order = order_item.order_id WHERE Orders.customer_id = $id_customer;";

  $result = mysqli_query($conn, $sql);
  $cart_count = "";

  if (mysqli_num_rows($result)) {
    $row = mysqli_fetch_assoc($result);
    $cart_count = (int)$row["cart_item_count"];
    $totalItemPrice = (int)$row["total_cost"];
  }

  echo json_encode(array("authorized" => true,
    "cartCount" => $cart_count, "total" =>$totalItemPrice));

} catch (Exception $e) {
  echo json_encode(["status" => "error",
    "error message" => $e->getMessage()]);
}

mysqli_close($conn);
?>