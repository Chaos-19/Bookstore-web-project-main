<?php

include "config.php";

try {
  if (
    isset(
      $_POST["bookname"],
      $_POST["bookAuthor"],
      $_POST["bookIsbn"],
      $_POST["bookcategory"],
      $_POST["bookprice"]
    )
  ) {
    $conn->begin_transaction();

    $title = mysqli_real_escape_string($conn, $_POST["bookname"]);
    $author = mysqli_real_escape_string($conn, $_POST["bookAuthor"]);
    $description = mysqli_real_escape_string($conn, $_POST["bookdescription"]);
    $book_catagory = mysqli_real_escape_string($conn, $_POST["bookcategory"]);
    $isbn = mysqli_real_escape_string($conn, $_POST["bookIsbn"]);
    $datetime = new DateTime();
    $price = mysqli_real_escape_string($conn, $_POST["bookprice"]);
    $nonepr = 0;

    $imageTempPath = $_FILES["bookimage"]["tmp_name"];
    $imageData = file_get_contents($imageTempPath);
    $book_id = "book_" . bin2hex(random_bytes(rand(4, 8)));

    $stmt = $conn->prepare(
      "INSERT INTO `Book` (`id_book`, `book_id`, `book_title`, `book_author`, `ISBN`, `book_category`, `book_description`, `createat`, `book_price`) VALUES (?,?,?,?,?,?,?,?,?)"
    );

    $stmt->bind_param(
      "isssssssi",
      $nonepr,
      $book_id,
      $title,
      $author,
      $isbn,
      $book_catagory,
      $description,
      $datetime->format("Y-m-d H:i:s"),
      $price
    );
    $stmt->execute();

    $bookid = $conn->insert_id;

    $stmt = $conn->prepare(
      "INSERT INTO Book_Image (image_id , bookid, book_image) VALUES (?,?,?)"
    );
    $stmt->bind_param("iis", $nonepr, $bookid, $imageData);
    $stmt->send_long_data(1, $imageData);
    $stmt->execute(); // Commit the transaction
    $conn->commit();

    echo json_encode([
      "status" => "success",
      "message" => "you have added the book seccessfully",
    ]);
  } else {
    echo json_encode([
      "status" => "error",
      "error message" => "Empty fields",
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
