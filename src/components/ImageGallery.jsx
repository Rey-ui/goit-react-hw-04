import ImageCard from "./ImageCard.jsx";
import css from "./ImageGallery.module.css";
const ImageGallery = ({ imageUrl, openModal }) => {
  return (
    <ul className={css.cardContainer}>
      {imageUrl.map((photo, index) => (
        <li
          className={css.cardItem}
          key={index}
          onClick={() => openModal(photo.urls.regular)}
        >
          <ImageCard imageUrl={photo} />
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;
