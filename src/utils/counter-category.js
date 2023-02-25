export const createMenuCategories = (books, categories) => {
  const counterMap = books.reduce((acc, book) => {
    book.categories?.forEach((category) => {
      if (acc[category]) {
        acc[category] += 1;

        return acc;
      }
      acc[category] = 1;

      return acc;
    });

    return acc;
  }, {});

  return categories.reduce((acc, category, index) => {
    if (index === 0) {
      return [];
    }

    return [...acc, { ...category, count: counterMap[category.name] ? counterMap[category.name] : 0 }];
  }, []);
};
