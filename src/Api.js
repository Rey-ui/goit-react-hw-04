import axios from "axios";
const url = "https://api.themoviedb.org/3/trending/movie/day?language=en-US";
const options = {
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MDlmMWQ5YzUwODExYTAyM2ZlODNlYzNmMjc0MTdkOSIsInN1YiI6IjY1ZmVjYTA0MDQ3MzNmMDE3ZGVjOGQ3NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tgymQKaHGxjCiVowtdo-t4DT1DQrhgqs9biItBT-NRA",
  },
};
export const fetchArticles = async () => {
  const response = await axios.get(url, options);
  return response.data.results;
};
export const fetchArticlesId = async (moviesId) => {
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
export const fetchArticlesCredits = async (movieId) => {
  if (movieId !== undefined) {
    const response = await axios.get(
      ` https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`,
      options
    );
    return response.data.cast;
  } else {
    return {};
  }
};
export const fetchArticlesReviews = async (moviesId) => {
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
export const fetchArticlesByQuery = async (query) => {
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
