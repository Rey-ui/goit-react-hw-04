import Modal from "react-modal";
import css from "./App.module.css";
Modal.setAppElement("#root");
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    border: "none",
    background: "none",
    overflow: "hidden",
    padding: "none",
  },
};
const ImageModal = ({
  modalIsOpen,
  selectedImage,
  afterOpenModal,
  closeModal,
}) => {
  return (
    <Modal
      isOpen={modalIsOpen}
      onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <img className={css.modalImg} src={selectedImage} alt="Selected" />
    </Modal>
  );
};

export default ImageModal;
