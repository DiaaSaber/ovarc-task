import axios from "axios";
import React, { useEffect, useState } from "react";
import AddStoreModal from "./AddStoreModal";

interface Store {
  id: number;
  name: string;
  address: string;
}

const Stores: React.FC = () => {
  const [storesData, setStoresData] = useState<Store[]>([]);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | "none">("none");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchStores = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/stores");
      setStoresData(response.data);
    } catch (error) {
      console.error("Error fetching stores:", error);
    }
  };
  useEffect(() => {
    fetchStores();
  }, []);

  const handleCreate = () => {
    setIsModalOpen(true);
  };

  const handleSort = () => {
    let sortedData = [...storesData];
    if (sortOrder === "none" || sortOrder === "desc") {
      sortedData.sort((a, b) => a.id - b.id);
      setSortOrder("asc");
    } else if (sortOrder === "asc") {
      sortedData.sort((a, b) => b.id - a.id);
      setSortOrder("desc");
    } else {
      setSortOrder("none");
      fetchStores();
      return;
    }
    setStoresData(sortedData);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const response = await axios.post("http://localhost:3000/api/stores", {
        name,
        address,
      });
      if (response.status === 201) {
        setIsModalOpen(false);
        setName("");
        setAddress("");
        fetchStores();
      }
    } catch (error) {
      console.error("Error creating store:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 bg-gray-100 flex flex-col space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Stores List</h2>
        <button
          onClick={handleCreate}
          className="bg-orange-500 text-white px-4 py-2 rounded shadow hover:bg-orange-600"
        >
          Add New Store
        </button>
      </div>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="w-full bg-gray-50 border-b">
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={handleSort}
              >
                Store ID
                {sortOrder === "asc" && <span> ↓</span>}
                {sortOrder === "desc" && <span> ↑</span>}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Address
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {storesData.map((store) => (
              <tr key={store.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  #{store.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {store.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {store.address}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AddStoreModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="text-xl font-bold mb-4">Add New Store</h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Store Name"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Address
          </label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Store Address"
          />
        </div>
        <div className="flex justify-end">
          <button
            onClick={handleSubmit}
            className="bg-orange-500 text-white px-4 py-2 rounded shadow hover:bg-orange-600"
            disabled={!name || !address || isSubmitting} // Disable if form is incomplete or submitting
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </div>
      </AddStoreModal>
    </div>
  );
};

export default Stores;
