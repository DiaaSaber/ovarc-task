import { Store } from "../models/Store";
import { Book } from "../models/Book";
import { StoreBook } from "../models/StoreBook";

export const findAllStores = async () => {
  return Store.findAll();
};

export const findStoreById = async (id: number) => {
  return Store.findByPk(id);
};

export const createStore = async (name: string, address: string) => {
  const existingStore = await Store.findOne({ where: { name } });
  if (existingStore) {
    throw new Error("Store already exists");
  }
  return Store.create({ name, address });
};

export const updateStoreById = async (
  id: number,
  name: string,
  address: string
) => {
  const store = await Store.findByPk(id);
  if (!store) {
    throw new Error("Store not found");
  }
  store.name = name;
  store.address = address;
  return store.save();
};

export const deleteStoreById = async (id: number) => {
  const store = await Store.findByPk(id);
  if (!store) {
    throw new Error("Store not found");
  }
  await store.destroy();
};

export const associateBookWithStore = async (
  storeId: number,
  bookId: number,
  price: number,
  soldOut: boolean
) => {
  const store = await Store.findByPk(storeId);
  if (!store) throw new Error("Store not found");

  const book = await Book.findByPk(bookId);
  if (!book) throw new Error("Book not found");

  const existingAssociation = await StoreBook.findOne({
    where: { store_id: store.id, book_id: book.id },
  });
  if (existingAssociation) {
    throw new Error("This book is already associated with this store");
  }

  return StoreBook.create({
    store_id: store.id,
    book_id: book.id,
    price,
    soldOut,
  });
};
