<?php

include "config.php";

try {
  session_start();

  $id = 0;
  $id_book = (int) mysqli_real_escape_string($conn, $_POST['idBook']);
  $order_id = "ORDER" .bin2hex(random_bytes(5));
  //$customer_id = mysqli_real_escape_string($conn, $_POST["customerId"]);
  $quantity = (int) mysqli_real_escape_string($conn, $_POST['quantity']);
  $subtotal = (int)mysqli_real_escape_string($conn, $_POST['bookPrice']) * $quantity;
  $book_price = (int)mysqli_real_escape_string($conn, $_POST['bookPrice']);
  $order_amount = $quantity * ((int)mysqli_real_escape_string($conn, $_POST['bookPrice']));

  if (!empty($id_book) &&
    !empty($quantity) &&
    !empty($order_amount)) {

    $sql = "SELECT * From order_item join Orders on order_item.order_id = Orders.id_order WHERE Orders.customer_id = {$_SESSION['id_user']} and order_item.book_id = $id_book;";
    $result = mysqli_query($conn, $sql);
    if (mysqli_num_rows($result) > 0) {
      $row = mysqli_fetch_assoc($result);
      $old_quantity = $row["quantity"];
      $id_order = $row["id_order"];
      $new_quantity = $old_quantity + ($quantity);
      $new_subtotal = $new_quantity * $book_price;

      $result = mysqli_query($conn, "UPDATE order_item SET quantity = $new_quantity , sub_total = $new_subtotal WHERE book_id = $id_book;");
      if ($result) {
        if (mysqli_query($conn, "UPDATE Orders SET order_amount = $new_subtotal WHERE  id_order= $id_order and customer_id ={$_SESSION['id_user']};")) {
          echo json_encode([
            "status" => "success",
            "message" => "quantity successfully updated", "productInfo" => [
              "newQuantity" => $new_quantity,
              "newTotal" => $new_subtotal,
            ]]
          );
        }
      } else {
        echo json_encode([
          "status" => "error",
          "message" => "Something went Wrong"
        ]);
      }
    } else {

      $conn->begin_transaction();

      $order_date = date('Y-m-d H:i:s');

      $stmt = $conn->prepare("INSERT INTO `Orders` (`id_order`, `order_id`, `customer_id`, `order_date`, `order_amount`) VALUES (?, ?, ?, ?, ?)");

      $stmt->bind_param("isisi",
        $id,
        $order_id,
        $_SESSION['id_user'],
        $order_date,
        $order_amount);

      $stmt->execute();

      $id_order = $conn->insert_id;

      $order_item_id = "ORDERBOOk".bin2hex(random_bytes(5));

      $stmt = $conn->prepare("INSERT INTO `order_item`(`id_order_item`, `order_item_id`, `order_id`, `book_id`, `quantity`, `sub_total`) VALUES (?, ?, ?, ?, ?, ?)");

      $stmt->bind_param("isiiii", $id, $order_item_id, $id_order, $id_book, $quantity, $subtotal);
      $stmt->execute();

      $conn->commit();

      echo json_encode([
        "status" => "success",
        "message" => "book successfully added to shopping cart 🛒", "productInfo" => [
          "order id" => "",
          "order item id" => "",
        ]]
      );
    }
  } else {
    echo json_encode([
      "status" => "error",
      "message" => "failed are empty",
      "Error message" => "empty query"]);
  }

} catch (Exception $e) {
  $conn->rollback();
  echo json_encode([
    "status" => "error",
    "message" => "product not committed file to insert data",
    "Error message" => $e->getMessage()]);
}
mysqli_close($conn)
?>