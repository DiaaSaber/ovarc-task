import axios from "axios";
import React, { useEffect, useState } from "react";

interface Store {
  name: string;
  price: number;
}

interface Book {
  id: number;
  name: string;
  pages: number;
  author: string;
  stores: Store[];
}

const BookList: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/books");
        setBooks(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching books:", error);
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-6 bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">Books</h2>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((book) => (
          <li key={book.id} className="bg-white p-4 rounded shadow-lg flex">
            <div className="w-1/4 bg-pink-50 flex items-center justify-center rounded-lg p-4">
              <p className="text-center text-sm font-semibold text-gray-800">
                {book.name}
              </p>
            </div>
            <div className="w-3/4 pl-6 flex flex-col justify-center">
              <div className="flex flex-col">
                <h3 className="text-xl font-semibold text-gray-800">
                  {book.name}
                </h3>
                <p className="text-gray-500 mb-4">by {book.author}</p>
              </div>
              <p className="text-gray-600 font-medium">Stores:</p>
              <div className="flex space-x-4 mt-2">
                {book.stores.map((store, index) => (
                  <div
                    key={index}
                    className="bg-pink-50 p-3 rounded-lg text-center"
                  >
                    <p className="text-gray-800">{store.name}</p>
                    <p className="text-orange-600 font-semibold text-lg">
                      ${store.price}
                    </p>
                    <button className="bg-blue-600 text-white px-4 py-2 mt-2 rounded hover:bg-blue-700 flex items-center justify-center space-x-2">
                      <span>Sell</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 3h18M9 12h6m-6 6h6M12 6v6m0 6v6"
                        />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookList;
