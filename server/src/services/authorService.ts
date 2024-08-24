import { Author } from "../models/Author";
import { Book } from "../models/Book";

export const findAllAuthors = async () => {
  return Author.findAll({ include: Book });
};

export const findAuthorById = async (id: number) => {
  return Author.findByPk(id, { include: Book });
};

export const createAuthor = async (name: string) => {
  const existingAuthor = await Author.findOne({ where: { name } });
  if (existingAuthor) {
    throw new Error("Author already exists");
  }
  return Author.create({ name });
};

export const updateAuthorById = async (id: number, name: string) => {
  const author = await Author.findByPk(id);
  if (!author) {
    throw new Error("Author not found");
  }
  author.name = name;
  return author.save();
};

export const deleteAuthorById = async (id: number) => {
  const author = await Author.findByPk(id);
  if (!author) {
    throw new Error("Author not found");
  }
  await author.destroy();
};
