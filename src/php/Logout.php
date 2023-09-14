<?php
// Logout API endpoint
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  session_start();
  session_destroy();
}
?>