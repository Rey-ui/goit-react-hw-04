import axios from "axios";
import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import Loader from "./components/Loader.jsx";
import Navigation from "./components/Navigation.jsx";
const HomePage = lazy(() => import("./pages/HomePage"));
const MoviesPage = lazy(() => import("./pages/MoviesPage"));
const MovieDetailsPage = lazy(() => import("./pages/MovieDetailsPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));
function App() {
  const url = "https://api.themoviedb.org/3/trending/movie/day?language=en-US";
  const options = {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MDlmMWQ5YzUwODExYTAyM2ZlODNlYzNmMjc0MTdkOSIsInN1YiI6IjY1ZmVjYTA0MDQ3MzNmMDE3ZGVjOGQ3NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tgymQKaHGxjCiVowtdo-t4DT1DQrhgqs9biItBT-NRA",
    },
  };
  const fetchArticles = async () => {
    const response = await axios.get(url, options);
    return response.data.results;
  };
  const fetchArticlesId = async (moviesId) => {
    if (moviesId !== undefined) {
      const response = await axios.get(
        ` https://api.themoviedb.org/3/movie/${moviesId}?language=en-US`,
        options
      );
      return response.data;
    } else {
      return {};
    }
  };
  const fetchArticlesCredits = async (moviesId) => {
    if (moviesId !== undefined) {
      const response = await axios.get(
        ` https://api.themoviedb.org/3/movie/${moviesId}/credits?language=en-US`,
        options
      );
      return response.data.cast;
    } else {
      return {};
    }
  };
  const fetchArticlesReviews = async (moviesId) => {
    if (moviesId !== undefined) {
      const response = await axios.get(
        ` https://api.themoviedb.org/3/movie/${moviesId}/reviews?language=en-US`,
        options
      );
      return response.data.results;
    } else {
      return {};
    }
  };
  const fetchArticlesByQuery = async (query) => {
    if (query !== undefined) {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`,
        options
      );
      return response.data.results;
    } else {
      return {};
    }
  };
  return (
    <>
      <Navigation>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route
              path="/"
              element={<HomePage fetchArticles={fetchArticles} />}
            />
            <Route
              path="/movies"
              element={
                <MoviesPage fetchArticlesByQuery={fetchArticlesByQuery} />
              }
            />
            <Route
              path="/movies/:moviesId/*"
              element={
                <MovieDetailsPage
                  fetchArticlesId={fetchArticlesId}
                  fetchArticlesCredits={fetchArticlesCredits}
                  fetchArticlesReviews={fetchArticlesReviews}
                />
              }
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </Navigation>
    </>
  );
}
export default App;
