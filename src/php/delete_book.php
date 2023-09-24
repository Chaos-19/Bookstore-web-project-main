<?php

include "config.php";
try {
  $id = mysqli_real_escape_string($conn, $_GET["id"]);

  $sql = " DELETE FROM Book WHERE id_book = $id";

  $result = mysqli_query($conn, $sql);

  if (mysqli_query($conn, $sql)) {
    echo json_encode([
      "status" => "success",
      "message" => "Item deleted successfully",
    ]);
  } else {
    echo json_encode([
      "status" => "error",
      "message" => "Something went wrong",
    ]);
  }
} catch (Exception $e) {
  echo json_encode([
    "result" => false,
    "status" => "error",
    "message" => $e->getMessage(),
  ]);
}
mysqli_close($conn);
?>
