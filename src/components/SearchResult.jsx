/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Link, useSearchParams } from "react-router-dom";
import "../App.css";
import { useGetMovies } from "../useGetMovies";
// import { useGetMovies } from "../useGetMovie";
import loadingImg from "../../public/assets/loading.gif";
import { useEffect } from "react";
function SearchResult() {
  const [searchParams] = useSearchParams();
  let tilte = searchParams.get("title");
  const [movies, isLoading, error] = useGetMovies(tilte);
  console.log(movies);
  useEffect(() => {
    document.title = "Search";
  }, []);
  return (
    <div className="main">
      <div className="upcoming">
        <div className="upcoming-movies">
          {isLoading && <Loader />}
          {!isLoading &&
            !error &&
            movies.map((mov) => (
              <Link to={`/detail/${mov.id}`} key={mov.id}>
                <Movie
                  key={mov.id}
                  year={""}
                  name={mov.title}
                  posterImg={mov.poster_path}
                  voteAvg={""}
                />
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}
function Loader() {
  return <p className="loader">Loading...</p>;
}
function Movie({ year, name, posterImg, voteAvg }) {
  const imgURL =
    posterImg != null
      ? `https://image.tmdb.org/t/p/original${posterImg}`
      : "/assets/loading.svg";
  return (
    <div className="movie">
      <img src={imgURL} alt={name} loading="lazy" />
      <div className="description">
        <div>
          <p>{voteAvg} </p>
          <h4>{year.split("-")[0]}</h4>
        </div>
        <h3>{name}</h3>
      </div>
    </div>
  );
}
export default SearchResult;
