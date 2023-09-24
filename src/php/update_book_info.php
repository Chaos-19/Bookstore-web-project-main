<?php

include "config.php";

try {
  if (
    isset(
      $_POST["bookid"],
      $_POST["bookname"],
      $_POST["bookAuthor"],
      $_POST["bookIsbn"],
      $_POST["bookcategory"],
      $_POST["bookprice"]
    )
  ) {
    $conn->begin_transaction();

    $book_id = mysqli_real_escape_string($conn, $_POST["bookid"]);
    $title = mysqli_real_escape_string($conn, $_POST["bookname"]);
    $author = mysqli_real_escape_string($conn, $_POST["bookAuthor"]);
    $description = mysqli_real_escape_string($conn, $_POST["bookdescription"]);
    $book_category = mysqli_real_escape_string($conn, $_POST["bookcategory"]);
    $isbn = mysqli_real_escape_string($conn, $_POST["bookIsbn"]);
    $datetime = new DateTime();
    $price = mysqli_real_escape_string($conn, $_POST["bookprice"]);
    $nonepr = 0;

    // Update the book information in the Book table
    $stmt = $conn->prepare(
      "UPDATE `Book` SET `book_title`=?, `book_author`=?, `ISBN`=?, `book_category`=?, `book_description`=?, `createat`=?, `book_price`=? WHERE `id_book`=?"
    );

    $stmt->bind_param(
      "sssssssi",
      $title,
      $author,
      $isbn,
      $book_category,
      $description,
      $datetime->format("Y-m-d H:i:s"),
      $price,
      $book_id
    );

    $stmt->execute();

    // Update the book image in the Book_Image table
    if (!empty($_FILES["bookimage"]["tmp_name"])) {
      $imageTempPath = $_FILES["bookimage"]["tmp_name"];
      $imageData = file_get_contents($imageTempPath);

      $stmt = $conn->prepare(
        "UPDATE `Book_Image` SET `book_image`=? WHERE `bookid`=?"
      );

      $stmt->bind_param("si", $imageData, $book_id);
      $stmt->send_long_data(0, $imageData);
      $stmt->execute();
    }

    $conn->commit();

    echo json_encode([
      "status" => "success",
      "message" => "You have updated the book successfully",
    ]);
  } else {
    echo json_encode([
      "status" => "error",
      "error message" => "Empty fields or book ID not provided",
    ]);
  }
} catch (Exception $e) {
  $conn->rollback();
  echo json_encode([
    "status" => "error",
    "error message" => $e->getMessage(),
  ]);
}

mysqli_close($conn);
?>
