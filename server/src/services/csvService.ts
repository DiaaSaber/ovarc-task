import fs from "fs";
import csv from "csv-parser";
import { Author } from "../models/Author";
import { Book } from "../models/Book";
import { Store } from "../models/Store";
import { StoreBook } from "../models/StoreBook";

export const processCsvAndPopulateDatabase = async (filePath: string) => {
  return new Promise<void>((resolve, reject) => {
    const results: any[] = [];

    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (data) => results.push(data))
      .on("end", async () => {
        try {
          for (let row of results) {
            // trimming all values
            for (let key in row) {
              if (row.hasOwnProperty(key)) {
                row[key] = row[key].trim();
              }
            }
            const {
              book_name,
              book_pages,
              author,
              store_name,
              store_address,
              store_price_for_book,
            } = row;

            let foundAuthor = await Author.findOne({ where: { name: author } });
            if (!foundAuthor) {
              foundAuthor = await Author.create({ name: author });
            }

            let book = await Book.findOne({
              where: { name: book_name, pages: parseInt(book_pages) },
            });
            if (!book) {
              book = await Book.create({
                name: book_name,
                pages: parseInt(book_pages),
                author_id: foundAuthor.id,
              });
            }

            let store = await Store.findOne({ where: { name: store_name } });
            if (!store) {
              store = await Store.create({
                name: store_name,
                address: store_address,
              });
            }

            const existingAssociation = await StoreBook.findOne({
              where: { store_id: store.id, book_id: book.id },
            });

            if (!existingAssociation) {
              await StoreBook.create({
                store_id: store.id,
                book_id: book.id,
                price: parseFloat(store_price_for_book),
                sold_out: false,
              });
            }
          }
          resolve();
        } catch (error) {
          reject(error);
        }
      });
  });
};
