import { Link, useLocation } from "react-router-dom";
import css from "./MovieList.module.css";
const MovieList = ({ movies }) => {
  const location = useLocation();
  return (
    <ul className={css.MovieListList}>
      {movies !== null &&
        Array.isArray(movies) &&
        movies.map((movie) => {
          return (
            <li className={css.MovieListItem} key={movie.id}>
              <Link
                className={css.MovieListLink}
                state={location}
                to={`/movies/${movie.id}`}
              >
                {movie.original_title}
              </Link>
            </li>
          );
        })}
    </ul>
  );
};

export default MovieList;
