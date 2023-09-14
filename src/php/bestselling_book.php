<?php
// Database connection (same as upload.php)
include "config.php";

$sql = "SELECT Book.id_book,Book.book_id,Book.book_title,Book.book_author, Book.book_price,Book_Image.book_image FROM Book CROSS JOIN Book_Image on Book.id_book = Book_Image.bookId LIMIT 20;";

$result = mysqli_query($conn, $sql);

if (mysqli_num_rows($result) > 0) {
  $result_ass = [];
  while ($row = mysqli_fetch_assoc($result)) {
    if (isset($row['book_image'])) {
      $row['book_image'] = '<img src="data:image;base64,' . base64_encode($row['book_image']) . '" alt="card-img-top"/>';
    }
    $result_ass[] = $row;
  }
  echo json_encode(array(
    "status" => "success",
    "message" => "Request was successfule.",
    "result" => array(
      "bookInfo" => $result_ass,
    )
  ));
} else {
  echo json_encode(array(
    "status" => "error",
    "message" => "something went wrong empty result(row)",
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