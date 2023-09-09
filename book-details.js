document.addEventListener("DOMContentLoaded", () => {
  const bookDetailsContent = document.getElementById("book-details-content");

  // Get the book ID from the URL
  const urlParams = new URLSearchParams(window.location.search);
  const bookId = urlParams.get("id");

  if (bookId) {
    // Make a fetch request to the Google Books API to get detailed book information
    fetch(`https://www.googleapis.com/books/v1/volumes/${bookId}`)
      .then((response) => response.json())
      .then((data) => {
        const book = data.volumeInfo;

        // Create HTML to display book details
        const bookDetailsHTML = `

          <div class="holder">
          <div class="image-holder">
          <img src="${book.imageLinks ? book.imageLinks.thumbnail : ""}" alt="${
          book.title
        } Cover"/>
        
          </div>

          <div>
          <h4>${book.title}</h4>

          <p>Description: ${
            book.description ? book.description : "No description available"
          }</p>
          </div>
          </div>

          <h4>Publisher: ${book.publisher ? book.publisher : "Unknown"}</h4>

          <h5>Published Date: ${
            book.publishedDate ? book.publishedDate : "Unknown"
          }</h5>

          <h6>Page Count: ${book.pageCount ? book.pageCount : "Unknown"}</h6>

          `;

        bookDetailsContent.innerHTML = bookDetailsHTML;
      })

      .catch((error) => {
        console.error(
          "Error fetching book details from Google Books API:",
          error
        );
      });
  }
});
