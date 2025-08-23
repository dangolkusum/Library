const container = document.querySelector(".container");

//adding books
const myLibrary = [
  {
    title: "The Alchemist",
    author: "Paulo Coelho",
    description: "A philosophical story about following your dreams.",
    cover:
      "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1483412266i/865.jpg",
  },
  {
    title: "The Metamorphosis",
    author: "Franz Kafka",
    description:
      "A surreal story about Gregor Samsa, who transformed into an insect.",
    cover:
      "https://m.media-amazon.com/images/I/81QOkf8RSIL._UF1000,1000_QL80_.jpg",
  },
  {
    title: "Harry Potter and the Sorcerer's Stone",
    author: "J.K. Rowling",
    description:
      "A young wizard discovers his magical heritage and attends Hogwarts.",
    cover: "https://media.thuprai.com/front_covers/harry-potter_front.jpg",
  },
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    description: "A tragic tale of wealth, love, and the American Dream.",
    cover:
      "https://www.gutenberg.org/cache/epub/64317/pg64317.cover.medium.jpg",
  },

  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    description:
      "A story of racial injustice and moral growth in the American South.",
    cover:
      "https://grey.com.np/cdn/shop/products/book-cover-To-Kill-a-Mockingbird-many-1961.webp?v=1669894816",
  },
];

//dialog box
const model = document.getElementById("dialog-box");
function openDialogBox() {
  model.showModal();
}
function closeDialogBox() {
  model.close();
}

// take params, create a book then store it in the array
const myForm = document.querySelector(".my-form");
myForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const description = document.getElementById("description").value;
  const fileInput = document.getElementById("book-cover");
  const file = fileInput.files[0];
  const reader = new FileReader();
  reader.readAsDataURL(file);
  if (file) {
    reader.onload = function (e) {
      const imageData = e.target.result;
      let newBook = new Book(title, author, description, imageData);
      myLibrary.push(newBook);
      Book.renderBooks(); //static method calling
      event.target.reset();
      closeDialogBox();
    };
  }
});

class Book {
  // the constructor...
  constructor(title, author, description, cover) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.description = description;
    this.cover = cover;
  }

  //books
  static renderBooks() {
    const bookCards = document.querySelector(".book-cards");
    bookCards.innerHTML = "";
    myLibrary.forEach((book, index) => {
      const card = document.createElement("div");
      const bookImage = document.createElement("div");
      const bookInfo = document.createElement("div");

      const icon = document.createElement("span");
      const title = document.createElement("p");
      const author = document.createElement("p");
      const description = document.createElement("p");
      const img = document.createElement("img");

      card.className = "card";

      bookImage.className = "book-image";
      bookInfo.className = "book-info";

      title.className = "title";
      author.className = "author";
      description.className = "description";
      icon.className = "remove-book";
      img.className = "book-cover";

      title.textContent = book.title;
      description.textContent = book.description;
      author.textContent = "By " + book.author;
      img.src = book.cover;
      icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>`;

      icon.addEventListener("click", () => {
        myLibrary.splice(index, 1);
        Book.renderBooks();
      });

      bookImage.appendChild(img);
      bookInfo.appendChild(title);
      bookInfo.appendChild(author);
      bookInfo.appendChild(description);
      card.appendChild(icon);

      card.appendChild(bookImage);
      card.appendChild(bookInfo);

      bookCards.appendChild(card);
    });
  }
}
Book.renderBooks();
