import { menuAllBooks } from '../constants/menu-category';

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
      return [
        ...acc,
        { id: 0, name: menuAllBooks.name, path: menuAllBooks.path, count: null },
        { ...category, count: counterMap[category.name] },
      ];
    }

    return [...acc, { ...category, count: counterMap[category.name] ? counterMap[category.name] : 0 }];
  }, []);
};
