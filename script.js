document.addEventListener("DOMContentLoaded", () => {
  const bookList = document.getElementById("book-list");

  //Search
  const searchInput = document.getElementById("search-input");
  const searchButton = document.getElementById("search-button");

  // Cart
  const cartCount = document.getElementById("cart-count");
  let cart = [];

  //Edit
  // let cart = 0;

  // Function to update the cart count
  function updateCartCount() {
    cartCount.textContent = cart.length;
    console.log(cart);

    //Edit
    // cart++;
    // cartCount.textContent = cart;
  }

  // Function to add a book to the cart
  function addToCart(book) {
    cart.push(book);
    updateCartCount();
  }

  // Before making the fetch request, show a loading indicator
  bookList.innerHTML = "<p>Loading...</p>";

  //TODO:: Function to fetch and display books based on the search query
  function searchBooks(query) {
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`)
      .then((response) => response.json())
      .then((data) => {
        const books = data.items;

        // Before making a new search, clear previous results or error messages
        bookList.innerHTML = "";

        //EDIT :: Errorr   IF
        if (books && books.length > 0) {
          // Loop through the books and create cards for each book
          books.forEach((book) => {
            const title = book.volumeInfo.title;
            const authors = book.volumeInfo.authors
              ? book.volumeInfo.authors.join(", ")
              : "Unknown";
            const description = book.volumeInfo.description
              ? book.volumeInfo.description
              : "No description available";
            const thumbnail = book.volumeInfo.imageLinks
              ? book.volumeInfo.imageLinks.thumbnail
              : "";

            const card = document.createElement("div");
            card.className = "card";
            card.innerHTML = `
                <img src="${thumbnail}" alt="${title} Cover">
                <div class="card-content">
                  <h2>${title}</h2>
                  <p>Authors: ${authors}</p>
                  <p>Description: ${description}</p>
                </div>
              `;

            bookList.appendChild(card);

            //TODO!! Create an "Add to Cart" button with a data attribute to store the book ID
            const addToCartButton = document.createElement("button");
            addToCartButton.className = "add-to-cart-button";
            addToCartButton.setAttribute("data-book-id", book.id);
            addToCartButton.textContent = "Add to Cart";
            // Append the button to the card
            card.appendChild(addToCartButton);
            // Append the card to the book list
            bookList.appendChild(card);

            //TODO!! Create a "View Details" button with a data attribute to store the book ID
            const viewDetailsButton = document.createElement("button");
            viewDetailsButton.className = "view-details-button";
            viewDetailsButton.setAttribute("data-book-id", book.id);
            viewDetailsButton.textContent = "View Details";
            // Append the button to the card
            card.appendChild(viewDetailsButton);
            // Append the card to the book list
            bookList.appendChild(card);

            //TODO!! Function to display detailed book information on a dedicated page
            function showBookDetails(book) {
              // Redirect to a dedicated book details page (you can create a new HTML page for this)
              window.location.href = `book-details.html?id=${book.id}`;
            }

            //TODO:: **  Event listener for the "View Details" button
            bookList.addEventListener("click", (event) => {
              const target = event.target;
              if (target.classList.contains("view-details-button")) {
                const bookId = target.getAttribute("data-book-id");

                const selectedBook = books.find((book) => book.id === bookId);
                if (selectedBook) {
                  showBookDetails(selectedBook);
                }
              }
            });

            //TODO:: ** Event listener for the "Add to Cart" button
            bookList.addEventListener("click", (event) => {
              const target = event.target;
              if (target.classList.contains("add-to-cart-button")) {
                const bookId = target.getAttribute("data-book-id");
                const selectedBook = books.find((book) => book.id === bookId);
                if (selectedBook) {
                  addToCart(selectedBook);
                }
              }
            });
          });

          //EDIT :: Errorr  ELSE
        } else {
          // If there are no results, display a message
          bookList.innerHTML =
            "<p>No books found. Please try a different search.</p>";
        }
      })

      .catch((error) => {
        console.error("Error fetching data from Google Books API:", error);

        //  Display an error message to the user
        bookList.innerHTML =
          "<p>Error loading books. Please try again later.</p>";
      });
  }

  //TODO?? Event listener for the search button
  searchButton.addEventListener("click", () => {
    const query = searchInput.value.trim();
    if (query !== "") {
      searchBooks(query);
    }
  });

  // Initial load of books (you can choose to load some default books)
  searchBooks("software development");
});
