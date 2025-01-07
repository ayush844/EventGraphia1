import React from "react";

const ImageCard = ({ image, onClick }) => {
  return (
    <div
      className="border rounded-lg overflow-hidden  hover:shadow-lg hover:shadow-black cursor-pointer hover:scale-105 transform transition duration-300 ease-in-out active:scale-95"
      onClick={onClick}
    >
      <img
        src={image.thumbnail}
        alt={`Thumbnail ${image.id}`}
        className="w-full h-36 md:h-40 lg:h-48 object-cover"
      />
    </div>
  );
};

export default ImageCard;
