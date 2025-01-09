import React, { useEffect, useState } from "react";

const FullViewModal = ({
  image,
  images,
  setCurrentImage,
  onClose,
  sendIndex,
}) => {
  const [currentIndex, setCurrentIndex] = useState(sendIndex);

  useEffect(() => {
    // index of the current image when the modal opens
    const index = images.findIndex((img) => img.id === image.id);
    setCurrentIndex(index);
  }, [image, images]);

  const handleDownload = async () => {
    try {
      const response = await fetch(image.download, { mode: "cors" });
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "downloaded-image.jpg";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Failed to download image:", error);
    }
  };

  const navigateImages = (direction) => {
    let newIndex = currentIndex;

    if (direction === "prev") {
      newIndex = currentIndex > 0 ? currentIndex - 1 : currentIndex;
    } else if (direction === "next") {
      newIndex =
        currentIndex < images.length - 1 ? currentIndex + 1 : currentIndex;
    }

    setCurrentIndex(newIndex);
    setCurrentImage(images[newIndex]);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") {
        navigateImages("prev");
      } else if (e.key === "ArrowRight") {
        navigateImages("next");
      } else if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentIndex, images]);

  return (
    <div
      className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="relative max-w-4xl w-full bg-purple-950 rounded-lg p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={images[currentIndex].fullView}
          alt={images[currentIndex].alt || "Full View"}
          className="w-full h-auto rounded-md mb-4"
        />

        <div className="flex justify-between items-center text-center mt-4">
          <button
            onClick={() => navigateImages("prev")}
            className="bg-gray-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-gray-700 transition disabled:opacity-55"
            disabled={currentIndex === 0}
          >
            Previous
          </button>

          <button
            onClick={handleDownload}
            className="bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700 transition"
          >
            Download
          </button>

          <button
            onClick={() => navigateImages("next")}
            className="bg-gray-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-gray-700 transition disabled:opacity-55"
            disabled={currentIndex === images.length - 1}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default FullViewModal;
