const quoteService = {
    fetchQuotes: () => {
      return fetch('http://localhost:3000/quotes?_embed=likes')
        .then((response) => response.json());
    },
  
    createQuote: (quote) => {
      return fetch('http://localhost:3000/quotes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(quote)
      })
        .then((response) => response.json());
    },
  
    deleteQuote: (id) => {
      return fetch(`http://localhost:3000/quotes/${id}`, {
        method: 'DELETE'
      });
    },
  
    addLike: (id) => {
      return fetch('http://localhost:3000/likes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ quoteId: id })
      })
        .then((response) => response.json());
    }
  };
  
  // Export quoteService object
  export default quoteService;
  