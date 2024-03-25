import { Suspense, useEffect, useRef, useState } from "react";
import { Link, Route, Routes, useLocation, useParams } from "react-router-dom";
import Loader from "../components/Loader.jsx";
import css from "./MovieDetailsPage.module.css";
import ErrorMessage from "../components/ErrorMessage";
import MovieCast from "../components/MovieCast.jsx";
import MovieReviews from "../components/MovieReviews.jsx";
import { fetchArticlesId } from "../Api.js";
const MovieDetailsPage = () => {
  const { moviesId } = useParams();
  const [movieData, setMovieData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const location = useLocation();
  const backLinkRef = useRef(location.state ?? "/");

  useEffect(() => {
    async function fetchData() {
      try {
        if (moviesId !== undefined) {
          setIsLoading(true);
          const data = await fetchArticlesId(moviesId);
          setMovieData(data);
        }
      } catch (err) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [fetchArticlesId, moviesId]);
  const getImageUrl = (imagePath, size = "w500") => {
    return `https://image.tmdb.org/t/p/${size}/${imagePath}`;
  };

  return (
    <div className={css.MovieDetailsContainer}>
      {isError && <ErrorMessage />}
      {isLoading && <Loader />}
      {movieData !== null && (
        <div className={css.MovieDetailsContent}>
          <Link className={css.MovieDetailsBack} to={backLinkRef.current}>
            Go back
          </Link>{" "}
          <div className={css.MovieDetailsContentContainer}>
            <div className={css.MovieDetailsImg}>
              <img
                src={getImageUrl(movieData.poster_path)}
                alt={movieData.title}
              />
            </div>
            <div className={css.MovieDetailsContentText}>
              <h1 className={css.MovieDetailsTitleh1}>{movieData.title}</h1>
              <p className={css.MovieDetailsText}>
                User score: {movieData.popularity}%
              </p>
              <h2 className={css.MovieDetailsTitleh2}>Overview</h2>
              <p className={css.MovieDetailsText}>{movieData.overview}</p>
              <h3 className={css.MovieDetailsTitleh3}>Genres</h3>
              <p className={css.MovieDetailsText}>
                {movieData.genres.map((movie) => {
                  return <span key={movie.id}>{movie.name}</span>;
                })}
              </p>
            </div>
          </div>
        </div>
      )}
      <div className={css.MovieDetailsAdditionalContainer}>
        <h3 className={css.MovieDetailsAdditional}>Additional information</h3>
        <div className={css.MovieDetailsContainerLink}>
          <div className={css.MovieDetailsLink}>
            <Link to="cast">Cast</Link>
          </div>
          <div className={css.MovieDetailsLink}>
            <Link to="reviews">Reviews</Link>
          </div>
        </div>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="cast" element={<MovieCast />} />
            <Route path="reviews" element={<MovieReviews />} />
          </Routes>
        </Suspense>
      </div>
    </div>
  );
};

export default MovieDetailsPage;
