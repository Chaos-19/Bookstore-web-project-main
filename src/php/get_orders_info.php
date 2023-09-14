<?php
include "config.php";
try {

  session_start();
  if (!isset($_SESSION['authenticated']) || $_SESSION['authenticated'] !== true) {
    http_response_code(401); // Unauthorized status code
    echo json_encode(["authorized" => false, "status" => 'error', "error message" => 'Unauthorized']);

  } else {

    $sql = "SELECT order_item.*,Orders.*,Book.book_title,Book.book_author,Book.book_price,Book_Image.book_image FROM order_item INNER JOIN Orders ON order_item.order_id = Orders.id_order LEFT JOIN Book ON order_item.book_id = Book.id_book LEFT JOIN Book_Image ON Book.id_book = Book_Image.bookid WHERE Orders.customer_id = {$_SESSION['id_user']}";

    $result = mysqli_query($conn, $sql);

    if (mysqli_num_rows($result) > 0) {
      $result_items = [];
      while ($row = mysqli_fetch_assoc($result)) {
        if (isset($row['book_image'])) {
          $row['book_image'] = '<img id="bookimg" src="data:image; base64,
    '. base64_encode($row['book_image']).'" alt="" class="d-block w-100"/>';
        }
        $result_items[] = $row;
      }

      echo json_encode([
        "status" => "success",
        "message" => "Request was successfule",
        "result" => [
          "books" => $result_items
        ]
      ]);

    } else {
      echo json_encode([
        "status" => "success",
        "message" => "user doesn't make order yet",
        "result" => [
          "books" => []
        ]
      ]);
    }
  }

} catch (Exception $e) {
  echo json_encode(["status" => "error",
    "error message" => $e->getMessage()]);
}
?>