import axios from "axios";
import { Movie } from "../types/movie";

const BASE_URL = "https://api.themoviedb.org/3";

const API_TOKEN = import.meta.env.VITE_TMDB_TOKEN;
if (!API_TOKEN) {
  throw new Error(
    "TMDB API token is missing. Please set VITE_TMDB_TOKEN in your environment."
  );
}

export interface FetchMoviesParams {
  query: string;
  page?: number;
}

export interface TMDBResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export async function fetchMovies({
  query,
  page = 1,
}: FetchMoviesParams): Promise<TMDBResponse> {
  try {
    const response = await axios.get<TMDBResponse>(`${BASE_URL}/search/movie`, {
      params: { query, page },
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
        accept: "application/json",
      },
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.response?.data || error.message);
    } else {
      console.error("Unknown error:", error);
    }
    throw new Error("Failed to fetch movies. Please try again later.");
  }
}
