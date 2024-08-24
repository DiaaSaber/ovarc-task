import { Request, Response } from "express";
import * as storeService from "../services/storeService";
import path from "path";
import { processCsvAndPopulateDatabase } from "../services/csvService";

// GET /stores
export const getAllStores = async (req: Request, res: Response) => {
  try {
    const stores = await storeService.findAllStores();
    res.json(stores);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// GET /stores/:id
export const getStore = async (req: Request, res: Response) => {
  try {
    const store = await storeService.findStoreById(parseInt(req.params.id));
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
    const store = await storeService.createStore(name, address);
    res.status(201).json(store);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// PUT /stores/:id
export const updateStore = async (req: Request, res: Response) => {
  try {
    const { name, address } = req.body;
    const store = await storeService.updateStoreById(
      parseInt(req.params.id),
      name,
      address
    );
    res.json(store);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE /stores/:id
export const deleteStore = async (req: Request, res: Response) => {
  try {
    await storeService.deleteStoreById(parseInt(req.params.id));
    res.status(204).send();
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// POST /stores/:storeId/books/:bookId
export const associateBookWithStore = async (req: Request, res: Response) => {
  const { storeId, bookId, price, sold_out } = req.params;
  try {
    const storeBook = await storeService.associateBookWithStore(
      parseInt(storeId),
      parseInt(bookId),
      parseFloat(price),
      sold_out === "true"
    );
    res
      .status(201)
      .json({ message: "Book associated with store successfully", storeBook });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const uploadCsv = async (req: Request, res: Response) => {
  try {
    const filePath = path.resolve(
      __dirname,
      "../../Sample Data for Bookstore - Sheet1.csv"
    );
    if (!filePath) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    await processCsvAndPopulateDatabase(filePath);
    res
      .status(200)
      .json({ message: "Database populated successfully from CSV file" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
