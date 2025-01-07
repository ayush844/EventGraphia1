import { useEffect, useState } from "react";
import "./App.css";
import ImageCard from "./Components/ImageCard";
import { HashLoader } from "react-spinners";

function App() {
  const [images, setImages] = useState([]);
  const [lastImageIndex, setLastImageIndex] = useState(0); // track the index of the last fetched image
  const [loading, setLoading] = useState(false);

  // fetching the images
  const fetchImages = (count) => {
    setLastImageIndex((prevLastIndex) => {
      const start = prevLastIndex + 1;
      const end = start + count - 1;

      console.log(
        "Start:",
        start,
        "End:",
        end,
        "Previous Last Index:",
        prevLastIndex
      );

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
      setLoading(false);
      return end; // Update the last index
    });
  };

  const handleScroll = () => {
    // to make sure that we reach the bottom of the page
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      // window.innerHeight: Height of the window.
      // document.documentElement.scrollTop: How far the user has scrolled down.
      // document.documentElement.scrollHeight: Total height of the document.

      // setLoading(true);
      // fetchImages(30);

      if (!loading) {
        setLoading(true);

        fetchImages(30);
      }
    }
  };

  // will run initially to fetch first 30 images and then ad scroll event listener to our window
  useEffect(() => {
    fetchImages(30);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const openFullView = (image) => {
    console.log(image.id);
  };

  return (
    <div className="max-w-[100vw] overflow-x-hidden min-h-[100vh] px-2 ">
      <div className="flex flex-col items-center h-full py-2 gap-10 md:gap-16 overflow-x-hidden">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-black font-mono underline italic">
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

        {loading && <HashLoader color="#440080" />}
      </div>
    </div>
  );
}

export default App;
