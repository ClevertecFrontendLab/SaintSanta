export type MenuListType = {
  id: number;
  name: string;
  category: string;
  value: string;
};

export const menuListBasic = {
  books: {
    name: 'Витрина книг',
    path: 'books',
  },
  terms: {
    name: 'Правила пользования',
    path: 'terms',
  },
  contract: {
    name: 'Договор оферты',
    path: 'contract-offer',
  },
  profile: {
    name: 'Профиль',
    path: 'profile',
  },
  exit: {
    name: 'Выход',
    path: 'auth',
  },
};

export const menuAllBooks = {
  id: 0,
  name: 'Все книги',
  category: 'all',
};

export const menuListCategories: MenuListType[] = [
  {
    id: 1,
    name: 'Бизнес книги',
    category: 'business',
    value: '14',
  },
  {
    id: 2,
    name: 'Детективы',
    category: 'detectives',
    value: '8',
  },
  {
    id: 3,
    name: 'Детские книги',
    category: 'children',
    value: '14',
  },
  {
    id: 4,
    name: 'Зарубежная литература',
    category: 'foreign',
    value: '2',
  },
  {
    id: 5,
    name: 'История',
    category: 'history',
    value: '5',
  },
  {
    id: 6,
    name: 'Классическая литература',
    category: 'classic',
    value: '12',
  },
  {
    id: 7,
    name: 'Книги по психологии',
    category: 'physiology',
    value: '11',
  },
  {
    id: 8,
    name: 'Компьютерная литература',
    category: 'computer',
    value: '54',
  },
  {
    id: 9,
    name: 'Культура и искусство',
    category: 'culture-art',
    value: '5',
  },
  {
    id: 10,
    name: 'Наука и образование',
    category: 'science-education',
    value: '2',
  },
  {
    id: 11,
    name: 'Публицистическая литература',
    category: 'publicistic',
    value: '0',
  },
  {
    id: 12,
    name: 'Справочники',
    category: 'guides',
    value: '10',
  },
  {
    id: 13,
    name: 'Фантастика',
    category: 'fantasy',
    value: '12',
  },
  {
    id: 14,
    name: 'Юмористическая литература',
    category: 'humor',
    value: '8',
  },
];
