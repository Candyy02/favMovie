import { useState, useEffect } from "react";

export function useGetCasts(movieID) {
  const [casts, setCasts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(
    function () {
      // callback?.();

      const controller = new AbortController();

      async function fetchmovie() {
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

          const res = await fetch(
            `https://api.themoviedb.org/3/movie/${movieID}/credits`,
            options
          );
          const data = await res.json();
          setCasts(data);
        } catch (err) {
          if (err.name !== "AbortError") {
            console.log(err.message);
            setError(err.message);
          }
        } finally {
          setIsLoading(false);
        }
      }

      if (movieID.length < 3) {
        setCasts([]);
        setError("");
        return;
      }

      fetchmovie();
      return function () {
        controller.abort();
      };
    },
    [movieID]
  );

  return [casts, isLoading, error];
}
