export type IBook = {
  [x: string]: any;
  id: string;
  title: string;
  bookDescription: string;
  author: string;
  genre: string;
  year: string;
  publicationDate: string;
  price: number;
  bookImage?: string;
  rating?: number;
  finishedReading?: boolean;
};

export interface Book {
  id: number;
  title: string;
  author: string;
  finishedReading?: boolean;
  status: "wishlist" | "currentlyReading" | "planToRead" | "finishedReading";
}
