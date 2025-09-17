import React from "react";
import { X } from "lucide-react";

const Drawer = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-[100]" onClick={onClose}>
      <div
        className="fixed top-0 right-0 h-full bg-luxury-bg-primary w-72 shadow-2xl p-6 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-6 right-6 text-luxury-text-secondary hover:text-luxury-text-heading">
          <X className="w-7 h-7" />
        </button>
        <div className="mt-12">
            {children}
        </div>
      </div>
    </div>
  );
};

export default Drawer;
