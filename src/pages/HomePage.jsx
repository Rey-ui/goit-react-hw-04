import { useEffect, useState } from "react";
import Loader from "../components/Loader.jsx";
import MovieList from "../components/MovieList.jsx";
import ErrorMessage from "../components/ErrorMessage";
import css from "./HomePage.module.css";
import { fetchArticles } from "../Api.js";
const HomePage = () => {
  const [movies, setMovies] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const data = await fetchArticles();

        setMovies(data);
      } catch (err) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <div className={css.HomePageContainer}>
      {isError && <ErrorMessage />}
      <h1 className={css.HomePageTitle}>Trending today</h1>
      {isLoading && <Loader />}
      {!isLoading && movies && movies.length > 0 && (
        <MovieList movies={movies} />
      )}
    </div>
  );
};

export default HomePage;
