import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import SearchBar from "./components/SearchBar.jsx";
import ImageGallery from "./components/ImageGallery.jsx";
import LoadMoreBtn from "./components/LoadMoreBtn.jsx";
import ErrorMessage from "./components/ErrorMessage.jsx";
import { Audio } from "react-loader-spinner";
import Modal from "react-modal";
import React from "react";
import css from "./components/App.module.css";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
Modal.setAppElement("#root");
import axios from "axios";
function App() {
  const [imageUrl, setImageUrl] = useState([]);
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
  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const form = evt.target;
    const topicForm = form.elements.search.value.trim();
    if (form.elements.search.value.trim() === "") {
      toast.error("This didn't work.");
      return;
    }
    try {
      setLoading(true);
      const photos = await fetchArticles(topicForm);
      if (photos.length === 0) {
        toast.error("This didn't work.");
        return;
      }
      setImageUrl(photos);
      setLoadMore(1);
      setTopic(topicForm);
      setError(false);
    } catch (error) {
      setError(true);
      console.error("Error fetching articles:", error);
    } finally {
      setLoading(false);
    }

    form.reset();
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
      setImageUrl((prevPhotos) => [...prevPhotos, ...newPhotos]);
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
      {imageUrl.length > 0 && (
        <ImageGallery imageUrl={imageUrl} openModal={openModal} />
      )}
      {loading && (
        <Audio
          height="80"
          width="80"
          radius="9"
          color="green"
          ariaLabel="loading"
          wrapperStyle
          wrapperClass
        />
      )}
      {error ? <ErrorMessage /> : null}
      <Toaster />
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <img className={css.modalImg} src={selectedImage} alt="Selected" />
      </Modal>
      {imageUrl.length > 0 && <LoadMoreBtn handleLoadMore={handleLoadMore} />}
    </>
  );
}

export default App;
