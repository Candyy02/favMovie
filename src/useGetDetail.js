import { useState, useEffect } from "react";
const KEY = "AIzaSyDo1eA05ZAFOBmJ7Eq8fHZ-ThiqEdivYyE";
export function useGetDetail(movieID) {
  const [movieDetail, setMovieDetail] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [trailer, setTrailer] = useState("");
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

          //   fetch(`https://api.themoviedb.org/3/movie/${movieID}`, options)
          //     .then((response) => response.json())
          //     .then((response) => setMovieDetail(response))
          //     .catch((err) => setError(err));
          const res = await fetch(
            `https://api.themoviedb.org/3/movie/${movieID}`,
            options
          );
          const data = await res.json();
          setMovieDetail(data);
          const resTrailer = await fetch(
            `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${data.title}&type=video&key=${KEY}`,
            { signal: controller.signal }
          );
          const dataTrailer = await resTrailer.json();
          console.log(dataTrailer.items[0].id.videoId);
          setTrailer(dataTrailer.items[0].id.videoId);
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
        setMovieDetail([]);
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

  return [movieDetail, trailer, isLoading, error];
}
