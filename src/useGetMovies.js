import { useState, useEffect } from "react";

export function useGetMovies(query) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(
    function () {
      // callback?.();

      const controller = new AbortController();

      async function fetchMovies() {
        try {
          setIsLoading(true);
          setError("");

          const options = {
            method: "GET",
            headers: {
              accept: "application/json",
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwY2EyOTg0MTc0MTI2MWYyMDk2OTgwNmUwMDEzNGQyNCIsInN1YiI6IjY0YjUxMzMzMTIxOTdlMDExY2FhOGY5ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.kRw_1bKCpAvuuMzYe-iiwagV67Mz-aeOXi6tgI-9vrc",
            },
          };

          fetch(
            `https://api.themoviedb.org/3/search/movie?query=${query}`,
            options
          )
            .then((response) => response.json())
            .then((response) => setMovies(response.results))
            .catch((err) => setError(err));
        } catch (err) {
          if (err.name !== "AbortError") {
            console.log(err.message);
            setError(err.message);
          }
        } finally {
          setIsLoading(false);
        }
      }

      if (query.length < 3) {
        setMovies([]);
        setError("");
        return;
      }

      fetchMovies();
      console.log(movies);
      return function () {
        controller.abort();
      };
    },
    [query, movies]
  );

  return [movies, isLoading, error];
}
