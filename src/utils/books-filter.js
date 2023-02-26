export const getFilterBooks = (books, filter, categories, category) => {
  const categoryName = categories.find(({ path }) => path === category)?.name;

  if (!categoryName) {
    return books.filter((book) => book.title.toLowerCase().includes(filter.toLowerCase()));
  }

  const filterBooks = books.filter(
    (book) => book.title.toLowerCase().includes(filter.toLowerCase()) && book.categories?.includes(categoryName)
  );

  return filterBooks;
};

export const sortBooksByRating = (books, inDecreasingOrderOfRating) => {
  const withRating = [];
  const noRating = [];

  books.forEach((book) => (book.rating ? withRating.push(book) : noRating.push(book)));

  if (inDecreasingOrderOfRating) {
    return [...withRating.sort((a, b) => b.rating - a.rating), ...noRating];
  }

  return [...noRating, ...withRating.sort((a, b) => a.rating - b.rating)];
};
