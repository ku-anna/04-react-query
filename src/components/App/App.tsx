import { useState, useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { Movie } from "../../types/movie";
import { fetchMovies, TMDBResponse } from "../../services/movieService";

import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import MovieModal from "../MovieModal/MovieModal";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Pagination from "../ReactPaginate/ReactPaginate";

export default function App() {
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const { data, isLoading, isError, isSuccess } = useQuery<TMDBResponse>({
    queryKey: ["movies", query, currentPage],
    queryFn: () => fetchMovies({ query, page: currentPage }),
    enabled: query !== "",
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    if (query !== "" && isSuccess && data.results.length === 0) {
      toast.error("No movies found");
    }
  }, [query, isSuccess, data]);

  const handleSearch = (newQuery: string) => {
    setQuery(newQuery);
    setCurrentPage(1);
  };

  const handleSelect = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const handleClose = () => {
    setSelectedMovie(null);
  };

  return (
    <>
      <SearchBar onSubmit={handleSearch} />

      <Toaster position="top-right" reverseOrder={false} />
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}

      {isSuccess && data.results.length > 0 && (
        <>
          <p style={{ padding: "8px 0" }}>
            Showing results for: <strong>{query}</strong>
          </p>

          <MovieGrid movies={data.results} onSelect={handleSelect} />

          {data.total_pages > 1 && (
            <Pagination
              pageCount={data.total_pages}
              forcePage={currentPage - 1}
              onPageChange={({ selected }) => setCurrentPage(selected + 1)}
            />
          )}
        </>
      )}

      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={handleClose} />
      )}
    </>
  );
}
