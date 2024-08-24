import { Book } from "../models/Book";
import { Author } from "../models/Author";

export const findAllBooks = async () => {
  return Book.findAll({ include: Author });
};

export const findBookById = async (id: number) => {
  return Book.findByPk(id, { include: Author });
};

export const createBook = async (
  name: string,
  pages: number,
  authorName?: string
) => {
  let author = await Author.findOne({ where: { name: authorName } });
  if (!author && authorName) {
    author = await Author.create({ name: authorName });
  }
  const existingBook = await Book.findOne({
    where: { name, pages, author_id: author?.id },
  });
  if (existingBook) {
    throw new Error("Book already exists");
  }
  return Book.create({ name, pages, author_id: author?.id });
};

export const updateBookById = async (
  id: number,
  name: string,
  pages: number
) => {
  const book = await Book.findByPk(id);
  if (!book) {
    throw new Error("Book not found");
  }
  book.name = name;
  book.pages = pages;
  return book.save();
};

export const deleteBookById = async (id: number) => {
  const book = await Book.findByPk(id);
  if (!book) {
    throw new Error("Book not found");
  }
  await book.destroy();
};
