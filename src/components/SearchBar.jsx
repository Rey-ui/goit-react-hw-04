import css from "./SearchBar.module.css";
import { useState } from "react";
const SearchBar = ({ onSubmit }) => {
  const [searchValue, setSearchValue] = useState("");

  const handleChange = (evt) => {
    setSearchValue(evt.target.value);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onSubmit(searchValue.trim());
  };

  return (
    <header className={css.header}>
      <form className={css.formSearch} onSubmit={handleSubmit}>
        <input
          className={css.inputSearch}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={searchValue}
          onChange={handleChange}
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
