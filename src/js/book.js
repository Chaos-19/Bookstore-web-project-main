const tableBody = document.querySelector("table tbody");
alert("kalkidan");
document.addEventListener("DOMContentLoaded", function () {
  fetch("./src/php/books_data.php")
    .then((response) => response.json())
    .then((data) => {
      alert(data.result.bookInfo);
      data.result.bookInfo.forEach((v) => {
        tableBody.innerHTML += getTableRow(
          v.book_id,
          v.book_image,
          v.book_title,
          v.book_category,
          v.book_author,
          v.book_description,
          v.book_price
        );
      });
    })
    .catch((error) => console.log(error));
});
const getTableRow = (
  id,
  image,
  title,
  category,
  author,
  description,
  price
) => {
  return `<tr> 
          <td>${id}</td>
          <td>${image}</td>
          <td>${title}</td>
          <td>${category}</td>
          <td>${author}</td>
          <td><span><p id="description" class="m-0 text-start">${description}</p> </span></td>
          <td>$<span class="price">${price}</span></td>
            <td>
                <div class="edit-btn">
                 <i class="bi bi-trash"></i>
                 <i class="bi bi-pen"></i>
                </div>
             </td>
         </tr>`;
};
