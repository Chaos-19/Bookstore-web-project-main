<?php
include "config.php";

try {
  $id_book = ($_GET['q']);

  $sql = "select * from Book Left join Book_Image on Book.id_book=Book_Image.bookId WHERE Book.id_book={$id_book};";
  $result = mysqli_query($conn,
    $sql);

  if (mysqli_num_rows($result) > 0) {
    $result_ass = [];
    while ($row = mysqli_fetch_assoc($result)) {
      if (isset($row['book_image'])) {
        $row['book_image'] = '<img src="data:image; base64,
  ' . base64_encode($row['book_image']) . '"class="img-fulid d-block w-100"/>';
      }
      $result_ass[] = $row;
    }
    echo json_encode(array("response" => "success", "result" => $result_ass));

  } else {
    echo json_encode(array("response" => "success", "message" => "empty", "result" => []));
  }
} catch (Exception $e) {
  echo json_encode(["error" =>
    $e->getMessage()]);
}
mysqli_close($conn);
?>