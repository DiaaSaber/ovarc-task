import { Request, Response } from "express";
import * as authorService from "../services/authorService";

// GET /authors
export const getAllAuthors = async (req: Request, res: Response) => {
  try {
    const authors = await authorService.findAllAuthors();
    res.json(authors);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// GET /authors/:id
export const getAuthor = async (req: Request, res: Response) => {
  try {
    const author = await authorService.findAuthorById(parseInt(req.params.id));
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
    const author = await authorService.createAuthor(name);
    res.status(201).json(author);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// PUT /authors/:id
export const updateAuthor = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const author = await authorService.updateAuthorById(
      parseInt(req.params.id),
      name
    );
    res.json(author);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE /authors/:id
export const deleteAuthor = async (req: Request, res: Response) => {
  try {
    await authorService.deleteAuthorById(parseInt(req.params.id));
    res.status(204).send();
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
