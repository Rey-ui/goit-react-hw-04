import css from "./ImageCard.module.css";
const ImageCard = ({ openModal, photo }) => {
  return (
    <div className={css.cardContent}>
      <img
        onClick={() => openModal(photo.urls.regular)}
        className={css.cardImg}
        src={photo.urls.small}
        alt=""
      />
    </div>
  );
};

export default ImageCard;
