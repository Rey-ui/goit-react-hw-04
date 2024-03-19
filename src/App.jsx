import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import SearchBar from "./components/SearchBar.jsx";
import ImageGallery from "./components/ImageGallery.jsx";
import LoadMoreBtn from "./components/LoadMoreBtn.jsx";
import ImageModal from "./components/ImageModal.jsx";
import Loader from "./components/Loader.jsx";
import React from "react";
import ErrorMessage from "./components/ErrorMessage.jsx";
import axios from "axios";
function App() {
  const [images, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [loadMore, setLoadMore] = useState(1);
  const [topic, setTopic] = useState("");
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  function openModal(imageUrl) {
    setSelectedImage(imageUrl);
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    //subtitle.style.color = "#f00";
  }

  function closeModal() {
    setSelectedImage(null);
    setIsOpen(false);
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const images = await fetchArticles(topic);
        if (topic === "") {
          return;
        }
        setPhotos(images);
        setHasError(false);
        if (images.length == []) {
          toast.error("This didn't work.");
          return;
        }
      } catch (error) {
        setHasError(true);
        console.error("Error fetching articles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [topic]);

  const handleSubmit = async (searchValue) => {
    setLoading(true);
    try {
      setPhotos(images);
      setLoadMore(1);
      setTopic(searchValue);
      setHasError(false);
    } catch (error) {
      setHasError(true);
      console.error("Error fetching articles:", error);
    } finally {
      setLoading(false);
    }
  };
  const fetchArticles = async (topic, page = 1) => {
    const response = await axios.get(
      `https://api.unsplash.com/search/photos?client_id=nj4XtoHtERFLRDKvM__gsRKs3HRprXuq4l3RQxg_Pa4&page=${page}&query=${topic}`
    );
    return response.data.results;
  };
  const handleLoadMore = async () => {
    setLoading(true);
    try {
      const newPhotos = await fetchArticles(topic, loadMore);
      setPhotos((prevPhotos) => [...prevPhotos, ...newPhotos]);
      setLoadMore((prevPage) => prevPage + 1);
      setHasError(false);
    } catch (error) {
      setHasError(true);
      console.error("Error fetching more articles:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <SearchBar onSubmit={handleSubmit} />
      {images.length > 0 && (
        <ImageGallery images={images} openModal={openModal} />
      )}
      {loading && <Loader />}
      <ImageModal
        modalIsOpen={modalIsOpen}
        afterOpenModal={afterOpenModal}
        closeModal={closeModal}
        selectedImage={selectedImage}
      />
      {hasError ? <ErrorMessage /> : null}
      {<Toaster />}
      {images.length > 0 && <LoadMoreBtn handleLoadMore={handleLoadMore} />}
    </>
  );
}

export default App;
