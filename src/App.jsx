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
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
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
        const photos = await fetchArticles(topic);
        setPhotos(photos);
        setError(false);
      } catch (error) {
        setError(true);
        console.error("Error fetching articles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [topic]);

  const handleSubmit = async (searchValue) => {
    if (searchValue.trim() === "") {
      toast.error("This didn't work.");
      return;
    }
    setLoading(true);
    try {
      const photos = await fetchArticles(searchValue);
      if (photos.length === 0) {
        toast.error("This didn't work.");
        return;
      }
      setPhotos(photos);
      setLoadMore(1);
      setTopic(searchValue);
      setError(false);
    } catch (error) {
      setError(true);
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
      setError(false);
    } catch (error) {
      setError(true);
      console.error("Error fetching more articles:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <SearchBar onSubmit={handleSubmit} />
      {photos.length > 0 && (
        <ImageGallery photos={photos} openModal={openModal} />
      )}
      {loading && <Loader />}
      <ImageModal
        modalIsOpen={modalIsOpen}
        afterOpenModal={afterOpenModal}
        closeModal={closeModal}
        selectedImage={selectedImage}
      />
      {error ? <ErrorMessage /> : null}
      <Toaster />
      {photos.length > 0 && <LoadMoreBtn handleLoadMore={handleLoadMore} />}
    </>
  );
}

export default App;
