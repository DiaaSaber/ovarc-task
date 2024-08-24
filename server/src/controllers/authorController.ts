// src/controllers/authorController.ts
import { Request, Response } from "express";
import { Author } from "../models/Author";
import { Book } from "../models/Book";

// GET /authors
export const getAllAuthors = async (req: Request, res: Response) => {
  try {
    const authors = await Author.findAll({ include: Book });
    res.json(authors);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// GET /authors/:id
export const getAuthor = async (req: Request, res: Response) => {
  try {
    const author = await Author.findByPk(req.params.id, { include: Book });
    if (!author) return res.status(404).json({ message: "Author not found" });

    res.json(author);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// POST /authors
export const createAuthor = async (req: Request, res: Response) => {
  const { name } = req.body;
  try {
    const existingAuthor = await Author.findOne({ where: { name } });
    if (existingAuthor) {
      return res.status(400).json({ message: "Author already exists" });
    }
    const author = await Author.create({ name });
    res.status(201).json(author);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// PUT /authors/:id
export const updateAuthor = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const author = await Author.findByPk(req.params.id);
    if (!author) return res.status(404).json({ message: "Author not found" });

    author.name = name;
    await author.save();
    res.json(author);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE /authors/:id
export const deleteAuthor = async (req: Request, res: Response) => {
  try {
    const author = await Author.findByPk(req.params.id);
    if (!author) {
      return res.status(404).json({ message: "Author not found" });
    }
    await author.destroy();
    res.status(204).send();
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
