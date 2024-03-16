import css from "./LoadMoreBtn.module.css";
const LoadMoreBtn = ({ handleLoadMore }) => {
  return (
    <div className={css.LoadMoreContainer}>
      <button
        className={css.LoadMoreBtn}
        type="button"
        onClick={handleLoadMore}
      >
        Load more
      </button>
    </div>
  );
};

export default LoadMoreBtn;
