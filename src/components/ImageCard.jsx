import css from "./ImageCard.module.css";
const ImageCard = ({ imageUrl }) => {
  return (
    <div className={css.cardContent}>
      <img className={css.cardImg} src={imageUrl.urls.small} alt="" />
    </div>
  );
};

export default ImageCard;
