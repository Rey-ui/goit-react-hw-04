import { Link, useLocation } from "react-router-dom";
import css from "./MovieList.module.css";
const MovieList = ({ movies }) => {
  const location = useLocation();
  const shouldDisplay =
    movies !== null && Array.isArray(movies) && movies.length > 0;
  return shouldDisplay ? (
    <ul className={css.MovieListList}>
      {movies.map((movie) => {
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
  ) : null;
};

export default MovieList;
