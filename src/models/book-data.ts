export interface BookData {
  id: string;
  img?: string[];
  name?: string;
  authors: string[];
  publicationDate?: number;
  isBooked?: boolean;
  bookedDate?: string;
  description?: string;
  rating?: number;
  publisher?: string;
  pages?: number;
  bookCover?: string;
  size?: string;
  weight?: number;
  ISBN?: string;
  ageLimit?: string;
  manufacturer?: string;
}
