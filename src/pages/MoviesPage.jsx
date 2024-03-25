import { useEffect, useState } from "react";
import { Field, Form, Formik } from "formik";
import ErrorMessage from "../components/ErrorMessage";
import Loader from "../components/Loader.jsx";
import MovieList from "../components/MovieList.jsx";
import { useSearchParams } from "react-router-dom";
import css from "./MoviesPage.module.css";
const MoviesPage = ({ fetchArticlesByQuery }) => {
  const [movies, setMovies] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("query");

  useEffect(() => {
    if (searchQuery === null) return;

    async function fetchDataByQuery() {
      try {
        setIsLoading(true);
        const data = await fetchArticlesByQuery(searchQuery);

        setMovies(data);
      } catch (err) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }

    fetchDataByQuery();
  }, [searchQuery]);

  const onSetSearchQuery = (searchTerm) => {
    if (searchTerm.trim().length === 0) {
      alert("Please enter a search term first!");
      return;
    }
    setSearchParams({ query: searchTerm });
  };

  return (
    <div className={css.MoviesPageContainer}>
      <h1 className={css.MoviesPageTitle}>Find your movie</h1>
      <Formik
        initialValues={{ query: searchQuery ?? "" }}
        onSubmit={(values) => {
          onSetSearchQuery(values.query);
        }}
      >
        <Form className={css.MoviesPageForm}>
          <Field
            className={css.MoviesPageInput}
            placeholder="Movie"
            type="text"
            name="query"
          />
          <button className={css.MoviesPageButton} type="submit">
            Search
          </button>
        </Form>
      </Formik>
      {isError && <ErrorMessage />}
      {isLoading && <Loader />}
      <MovieList movies={movies} />
    </div>
  );
};

export default MoviesPage;
