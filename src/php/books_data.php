<?php
// Database connection (same as upload.php)
include "config.php";

$sql = "select * from Book Left join Book_Image on Book.id_book = Book_Image.bookId \n"
. "ORDER BY `Book`.`id_book` DESC limit 20;";
$result = mysqli_query($conn, $sql);

if (mysqli_num_rows($result) > 0) {
  $result_ass = [];
  while ($row = mysqli_fetch_assoc($result)) {
    if (isset($row['book_image'])) {
      $row['book_image'] = '<img src="data:image;base64,' . base64_encode($row['book_image']) . '"class="w-100 img-thumbnail" alt="image" />';
    }
    $result_ass[] = $row;
  }
  echo json_encode(array(
    "status" => "success",
    "message" => "Request was successful.",
    "result" => array(
      "bookInfo" => $result_ass,
    )
  ));
} else {
  echo json_encode(array(
    "status" => "success",
    "message" => "Request was successful. empty result(row)",
    "result" => array(
      "bookInfo" => [],
    )
  ));
}

$conn->close();


/*
$erro_response = array(
"status" => "error",
"message" => "Invalid input. Please provide a valid book ID.",
"data" => null);
*/
?>