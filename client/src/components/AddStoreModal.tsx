import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const AddStoreModal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <div className="flex justify-end">
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            &times;
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default AddStoreModal;
