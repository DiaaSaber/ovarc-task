import { Book } from "../models/Book";
import { Author } from "../models/Author";
import { Store } from "../models/Store";

export const findAllBooks = async () => {
  const books = await Book.findAll({
    include: [
      {
        model: Author,
        attributes: ["id", "name"],
      },
      {
        model: Store,
        through: {
          attributes: ["price"],
        },
        attributes: ["id", "name"],
      },
    ],
  });

  return books.map((book) => ({
    id: book.id,
    name: book.name,
    pages: book.pages,
    author: book.Author?.name,
    stores: book.Stores?.map((store) => ({
      name: store.name,
      price: store.StoreBook?.price,
    })),
  }));
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
