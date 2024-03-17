import ImageCard from "./ImageCard.jsx";
import css from "./ImageGallery.module.css";
const ImageGallery = ({ photos, openModal }) => {
  return (
    <ul className={css.cardContainer}>
      {photos.map((photo) => (
        <li className={css.cardItem} key={photo.id}>
          <ImageCard photo={photo} openModal={openModal} />
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;
