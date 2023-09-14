  <?php

  // $response = file_get_contents($url);
  // echo $response;
  /*
  $conn = mysqli_connect('localhost', 'root', '', 'Online_Book_store') or die("connection failed"); */

  $servername = 'localhost';
  $dbname = 'Online_Book_store';
  $username = 'root';
  $password = '';

  $conn = new mysqli($servername, $username, $password, $dbname);

  // Check connection
  if ($conn->connect_error) {
    die("Connection failed: ". $conn->connect_error);
  }
  if ($conn) echo "connectd successful";

  if (isset($_POST['request'])) {
    try {





      $endpoint = 'https://api.nytimes.com/svc/books/v3/lists/full-overview.json';
      $apiKey = '3clpt79cpr6iJlCre7vhCA9utTiN0uA4';
      $url = "{$endpoint}?api-key={$apiKey}";

      $ch = curl_init();

      curl_setopt($ch, CURLOPT_URL, $url);
      curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

      $response = curl_exec($ch);

      if ($response === false) {
        echo 'cURL Error: ' . curl_error($ch);
      }
      // Close the cURL session
      curl_close($ch);




      if ($response) {
        $data = json_decode($response, true);
        # var_dump($response);
        $booksList = $data['results']['lists'];

        foreach ($booksList as $Listscategory) {
          $category = $Listscategory['list_name'];
          # mysqli_query($conn, "INSERT INTO category");
          foreach ($Listscategory['books'] as $book) {
            try {
              // Start a transactio
              $conn->begin_transaction();

              // Insert data into the Books table
              $book_id = 'book_'.rand(100, 1000);
              $title = $book['title'];
              $author = $book['author'];
              $description = $book['description'];
              $book_catagory = $category;
              $isbn = $book['primary_isbn13'];
              $datetime = new DateTime();
              $price = rand(65, 400);
              $nonepr = 0;
              $book_img_url = $book['book_image'];
              $stmt = $conn->prepare("INSERT INTO `Book` (`id_book`,`book_id`, `book_title`, `book_author`, `ISBN`, `book_category`, `book_description`, `createat`, `book_price`) VALUES (?,?,? ,?,?,? ,?,?,?)");

              $stmt->bind_param('isssssssi', $nonepr, $book_id, $title,
                $author, $isbn, $book_catagory,
                $description, $datetime->format('Y-m-d H:i:s'), $price);
              $stmt->execute();

              $book_id = $conn->insert_id;
              // Insert data into the Book_Images table
              $imageData = file_get_contents($book_img_url); // Your image data
              $stmt = $conn->prepare("INSERT INTO Book_Image (image_id , book_id, book_image) VALUES (?,?, ?)");
              $stmt->bind_param('iis', $nonepr, $book_id, $imageData);
              $stmt->send_long_data(1, $imageData);
              $stmt->execute(); // Commit the transaction
              $conn->commit();

              echo "Data inserted successfully!";

            } catch (Exception $e) {
              // Rollback the transaction on error
              $conn->rollback();
              echo "Error: " . $e->getMessage();
            }
          } ## echo "-------------#####---------;
        }
      }

    } catch (Exception $e) {
      echo "error : {$e->getMessage()}";
    }
  }
  // $url = "https://storage.googleapis.com/du-prd/books/images/9780316404891.jpg";
  //   $img = 'img1.png';
  //   // Function to write image into file
  //
  //   file_put_contents($img, file_get_contents($url));

  ?>