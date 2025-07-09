import axios from "axios";
import { Movie } from "../types/movie";

const BASE_URL = "https://api.themoviedb.org/3";

const API_TOKEN = import.meta.env.VITE_TMDB_TOKEN;
if (!API_TOKEN) {
  throw new Error(
    "TMDB API token is missing. Please set VITE_TMDB_TOKEN in your environment."
  );
}

interface FetchMoviesParams {
  query: string;
  page?: number;
}

interface TMDBResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export async function fetchMovies({
  query,
  page = 1,
}: FetchMoviesParams): Promise<Movie[]> {
  try {
    const response = await axios.get<TMDBResponse>(`${BASE_URL}/search/movie`, {
      params: {
        query,
        page,
      },
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
    });

    return response.data.results;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;

      if (status === 401) {
        console.error("Unauthorized: Check your TMDB API token.");
      } else if (status === 404) {
        console.error("Endpoint not found.");
      } else {
        console.error("Network or server error:", error.message);
      }
    } else {
      console.error("Unexpected error:", error);
    }

    throw new Error("Failed to fetch movies. Please try again later.");
  }
}
