<?php
function authenticate() {
  session_start();
  if (!isset($_SESSION['authenticated']) || $_SESSION['authenticated'] !== true) {
    http_response_code(401); // Unauthorized status code
    echo json_encode(["authorized" => false, 'error' => 'Unauthorized']);
    exit;
  } else {
    echo json_encode(array("authorized" => true, 'user_id' => $_SESSION['user_id'], "user_name" => $_SESSION['user_name'], "user_email" => $_SESSION['user_email']));
  }
}

authenticate();
?>