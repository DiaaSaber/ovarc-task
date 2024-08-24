import { Request, Response } from "express";
import * as bookService from "../services/bookService";

// GET /books
export const getAllBooks = async (req: Request, res: Response) => {
  try {
    const books = await bookService.findAllBooks();
    res.json(books);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// GET /books/:id
export const getBook = async (req: Request, res: Response) => {
  try {
    const book = await bookService.findBookById(parseInt(req.params.id));
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
    const book = await bookService.createBook(name, pages, authorName);
    res.status(201).json(book);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// PUT /books/:id
export const updateBook = async (req: Request, res: Response) => {
  const { name, pages } = req.body;
  try {
    const book = await bookService.updateBookById(
      parseInt(req.params.id),
      name,
      pages
    );
    res.json(book);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE /books/:id
export const deleteBook = async (req: Request, res: Response) => {
  try {
    await bookService.deleteBookById(parseInt(req.params.id));
    res.status(204).send();
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
