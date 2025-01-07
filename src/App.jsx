import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import ImageCard from "./Components/ImageCard";
import { HashLoader } from "react-spinners";

function App() {
  const [images, setImages] = useState([]);

  const fetchImages = (count) => {
    const start = images.length + 1;
    const end = start + count - 1;
    const newImages = [];
    for (let i = start; i <= end; i++) {
      newImages.push({
        thumbnail: `https://placehold.co/200x200/jpg?text=${i}`,
        fullView: `https://placehold.co/2000x2000/jpg?text=${i}`,
        download: `https://placehold.co/3900x3900/jpg?text=${i}`,
        id: i,
      });
    }
    setImages((prevImages) => [...prevImages, ...newImages]);
  };

  useEffect(() => {
    fetchImages(30);
  }, []);

  // fetchImages(30);

  const openFullView = (image) => {
    console.log(image.id);
  };

  console.log(images);

  return (
    <div className="max-w-[100vw] overflow-x-hidden min-h-[100vh] px-2 ">
      <div className="flex flex-col items-center h-full  py-2 gap-10 md:gap-16  overflow-x-hidden">
        <h1 className=" text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold  text-black font-mono underline italic">
          Image Gallery
        </h1>

        <div className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 grid-cols-2 gap-2 md:gap-4 lg:gap-10">
          {images.map((image) => (
            <ImageCard
              key={image.id}
              image={image}
              onClick={() => openFullView(image)}
            />
          ))}
        </div>
        <HashLoader color="#440080" />
      </div>
    </div>
  );
}

export default App;
