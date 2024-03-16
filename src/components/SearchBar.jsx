import css from "./SearchBar.module.css";
const SearchBar = ({ onSubmit }) => {
  return (
    <header className={css.header}>
      <form className={css.formSearch} onSubmit={onSubmit}>
        <input
          className={css.inputSearch}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          name="search"
        />
        <button className={css.buttonSearch} type="submit">
          Search
        </button>
      </form>
    </header>
  );
};

export default SearchBar;
