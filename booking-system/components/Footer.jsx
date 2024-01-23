"use client";
import React, { useState } from "react";
import Image from "next/image";

const Footer = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <footer className="bg-gray-800 text-white p-8">
      <div className="container mx-auto flex justify-between items-center">
        <p>&copy; 2023 Jade Resort</p>

        <button className="flex space-x-4 text-blue-500" onClick={openModal}>
          Help
        </button>

        {isModalOpen && (
          <div className="modal">
            <div className="modal-content">
              <button className="close-btn" onClick={closeModal}>
                Close
              </button>
              <div className="image-container">
                <Image
                  src="/pic1.png"
                  alt="Help Image 1"
                  width={800} // Adjusted width
                  height={600} // Adjusted height
                />
                <Image
                  src="/pic2.png"
                  alt="Help Image 2"
                  width={800} // Adjusted width
                  height={600} // Adjusted height
                />
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .modal {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10;
        }

        .modal-content {
          background: #fff;
          padding: 20px;
          max-width: 800px; // Adjusted max-width
          width: 100%;
          overflow-y: auto;
        }

        .image-container {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .close-btn {
          position: absolute;
          top: 10px;
          right: 10px;
          background-color: gray;
          border: none;
          cursor: pointer;
          padding: 5px 15px;
          border-radius: 5px;
        }
      `}</style>
    </footer>
  );
};

export default Footer;
