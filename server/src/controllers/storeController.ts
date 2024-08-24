// src/controllers/storeController.ts
import { Request, Response } from "express";
import { Store } from "../models/Store";
import { Book } from "../models/Book";
import { StoreBook } from "../models/StoreBook";

// GET /stores
export const getAllStores = async (req: Request, res: Response) => {
  try {
    const stores = await Store.findAll();
    res.json(stores);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// GET /stores/:id
export const getStore = async (req: Request, res: Response) => {
  try {
    const store = await Store.findByPk(req.params.id);
    if (!store) return res.status(404).json({ message: "Store not found" });

    res.json(store);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// POST /stores
export const createStore = async (req: Request, res: Response) => {
  const { name, address } = req.body;
  try {
    const existingStore = await Store.findOne({ where: { name } });
    if (existingStore)
      return res.status(400).json({ message: "Store already exists" });

    const store = await Store.create({ name, address });
    res.status(201).json(store);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// PUT /stores/:id
export const updateStore = async (req: Request, res: Response) => {
  try {
    const { name, address } = req.body;
    const store = await Store.findByPk(req.params.id);
    if (!store) return res.status(404).json({ message: "Store not found" });

    store.name = name;
    store.address = address;
    await store.save();
    res.json(store);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE /stores/:id
export const deleteStore = async (req: Request, res: Response) => {
  try {
    const store = await Store.findByPk(req.params.id);
    if (!store) {
      return res.status(404).json({ message: "Store not found" });
    }
    await store.destroy();
    res.status(204).send();
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// POST /stores/:storeId/books/:bookId
export const associateBookWithStore = async (req: Request, res: Response) => {
  const { storeId, bookId, price, soldOut } = req.params;
  try {
    const store = await Store.findByPk(storeId);
    if (!store) return res.status(404).json({ message: "Store not found" });

    const book = await Book.findByPk(bookId);
    if (!book) return res.status(404).json({ message: "Book not found" });

    const existingAssociation = await StoreBook.findOne({
      where: { store_id: store.id, book_id: book.id },
    });

    if (existingAssociation) {
      return res
        .status(409)
        .json({ message: "This book is already associated with this store" });
    }

    const storeBook = await StoreBook.create({
      store_id: store.id,
      book_id: book.id,
      price: parseFloat(price),
      soldOut: soldOut === "true",
    });
    res
      .status(201)
      .json({ message: "Book associated with store successfully", storeBook });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
