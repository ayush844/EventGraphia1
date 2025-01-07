import React from "react";

const FullViewModal = ({ image, onClose }) => {
  if (!image) return null;

  const handleDownload = async () => {
    try {
      const response = await fetch(image.download, { mode: "cors" }); // Fetch the image
      const blob = await response.blob(); // Convert to blob
      const url = window.URL.createObjectURL(blob); // Create a URL for the blob
      const link = document.createElement("a");
      link.href = url;
      link.download = "downloaded-image.jpg"; // Set filename for download
      document.body.appendChild(link);
      link.click(); // Trigger the download
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url); // Clean up the object URL
    } catch (error) {
      console.error("Failed to download image:", error);
    }
  };

  return (
    <div
      className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="relative max-w-4xl w-full bg-purple-950 rounded-lg p-8"
        onClick={(e) => e.stopPropagation()} // Prevent closing modal when clicking inside
      >
        <img
          src={image.fullView}
          alt={image.alt || "Full View"}
          className="w-full h-auto rounded-md mb-4"
        />

        <div className="flex justify-end text-center">
          <button
            onClick={handleDownload}
            className="bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700 transition"
          >
            Download
          </button>
        </div>
      </div>
    </div>
  );
};

export default FullViewModal;
