// DOM elements
const quoteList = document.getElementById('quote-list');
const newQuoteForm = document.getElementById('new-quote-form');
const newQuoteInput = document.getElementById('new-quote');
const authorInput = document.getElementById('author');

// Event listener for form submission
newQuoteForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const quoteText = newQuoteInput.value.trim();
  const author = authorInput.value.trim();

  if (quoteText && author) {
    createQuote(quoteText, author);
    newQuoteInput.value = '';
    authorInput.value = '';
  }
});

// Function to create a new quote
function createQuote(text, author) {
  const quote = {
    quote: text,
    author: author
  };

  quoteService.createQuote(quote)
    .then((newQuote) => renderQuote(newQuote));
}

// Function to render a single quote on the page
function renderQuote(quote) {
  const quoteCard = document.createElement('li');
  quoteCard.classList.add('quote-card');
  quoteCard.innerHTML = `
    <blockquote class="blockquote">
      <p class="mb-0">${quote.quote}</p>
      <footer class="blockquote-footer">${quote.author}</footer>
      <br>
      <button class="btn-success like-btn" data-id="${quote.id}">Likes: <span>${quote.likes}</span></button>
      <button class="btn-danger delete-btn" data-id="${quote.id}">Delete</button>
    </blockquote>
  `;

  // Event listener for delete button
  const deleteButton = quoteCard.querySelector('.delete-btn');
  deleteButton.addEventListener('click', () => {
    deleteQuote(quote.id);
  });

  // Event listener for like button
  const likeButton = quoteCard.querySelector('.like-btn');
  likeButton.addEventListener('click', () => {
    addLike(quote.id);
  });

  quoteList.appendChild(quoteCard);
}

// Function to delete a quote
function deleteQuote(id) {
  quoteService.deleteQuote(id)
    .then(() => {
      const quoteCard = document.querySelector(`.quote-card[data-id="${id}"]`);
      quoteCard.remove();
    });
}

// Function to add a like to a quote
function addLike(id) {
  quoteService.addLike(id)
    .then((quote) => {
      const likeButton = document.querySelector(`.like-btn[data-id="${id}"]`);
      const likeCount = likeButton.querySelector('span');
      likeCount.textContent = quote.likes;
    });
}

// Fetch quotes on page load
quoteService.fetchQuotes()
  .then((quotes) => {
    quotes.forEach((quote) => renderQuote(quote));
  });
