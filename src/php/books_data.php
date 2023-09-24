<?php
// Database connection (same as upload.php)
include "config.php";

$sql =
  "select * from Book Left join Book_Image on Book.id_book = Book_Image.bookId \n" .
  "ORDER BY `Book`.`id_book` DESC;";
$result = mysqli_query($conn, $sql);

if (mysqli_num_rows($result) > 0) {
  $result_ass = [];
  while ($row = mysqli_fetch_assoc($result)) {
    if (isset($row["book_image"])) {
      $row["book_image"] =
        '<img src="data:image;base64,' .
        base64_encode($row["book_image"]) .
        '"class="w-100 img-thumbnail" alt="image" />';
    }
    $result_ass[] = $row;
  }
  echo json_encode([
    "status" => "success",
    "message" => "Request was successful.",
    "result" => [
      "bookInfo" => $result_ass,
    ],
  ]);
} else {
  echo json_encode([
    "status" => "success",
    "message" => "Request was successful. empty result(row)",
    "result" => [
      "bookInfo" => [],
    ],
  ]);
}

mysqli_close($conn);
?>
