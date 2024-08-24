import { Request, Response } from "express";
import { Book } from "../models/Book";
import { Author } from "../models/Author";

// GET /books
export const getAllBooks = async (req: Request, res: Response) => {
  try {
    const books = await Book.findAll({ include: Author });
    res.json(books);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// GET /books/:id
export const getBook = async (req: Request, res: Response) => {
  try {
    const book = await Book.findByPk(req.params.id, { include: Author });
    if (!book) return res.status(404).json({ message: "Book not found" });

    res.json(book);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// POST /books
export const createBook = async (req: Request, res: Response) => {
  const { name, pages, authorName } = req.body;
  try {
    let author = await Author.findOne({ where: { name: authorName } });
    if (!author && authorName) {
      author = await Author.create({ name: authorName });
    }
    const existingBook = await Book.findOne({
      where: { name, pages, author_id: author?.id },
    });
    if (existingBook) {
      return res.status(400).json({ message: "Book already exists" });
    }
    const book = await Book.create({ name, pages, author_id: author?.id });
    res.status(201).json(book);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// PUT /books/:id
export const updateBook = async (req: Request, res: Response) => {
  try {
    const { name, pages } = req.body;
    const book = await Book.findByPk(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });
    book.name = name;
    book.pages = pages;
    await book.save();
    await book.update(req.body);
    res.json(book);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE /books/:id
export const deleteBook = async (req: Request, res: Response) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    await book.destroy();
    res.status(204).send();
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
