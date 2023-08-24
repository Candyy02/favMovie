import { Link } from "react-router-dom";
import { useLocalStorageState } from "../useLocalStorageState";
import "./WatchList.css";
import { useEffect, useState } from "react";

function WatchList() {
  const [movies, setMovies] = useLocalStorageState([], "watchlist");
  const [sortBy, setSortBy] = useState("addition");
  useEffect(() => {
    document.title = "Watchlist";
  }, []);
  let sortedMovies = [];
  if (sortBy === "addition") sortedMovies = movies?.map((e) => e);
  if (sortBy === "alphabet")
    sortedMovies = movies.sort((a, b) => a.title.localeCompare(b.title));
  if (sortBy === "length")
    sortedMovies = movies.sort((a, b) => a.length - b.length);
  if (sortBy === "rate") sortedMovies = movies.sort((a, b) => a.vote - b.vote);
  if (sortBy === "year") sortedMovies = movies.sort((a, b) => a.year - b.year);
  return (
    <div className="watch-list">
      <div className="header">
        <h1>Watch List</h1>
        <div className="sort">
          <img src="/assets/sort.png" alt="" />
          <select
            name="sort"
            id="sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="addition">Addition order</option>
            <option value="alphabet">Alphabetical</option>
            <option value="rate">Rate</option>
            <option value="year">Year</option>
            <option value="length">Length</option>
          </select>
        </div>
      </div>

      {sortedMovies.map((mov) => (
        <div className="movie" key={mov.id}>
          <img src={mov.img} alt="" />
          <div className="info">
            <div className="head">
              <Link to={`/detail/${mov.id}`}>
                <h5>{mov.title}</h5>
              </Link>
              <div>
                <img
                  src="assets/close.png"
                  alt=""
                  onClick={() =>
                    setMovies(
                      movies.filter((movie) => movie.title !== mov.title)
                    )
                  }
                />
              </div>
            </div>
            <div className="if-1">
              <p>{mov.year}</p>
              <p>{mov.length} min.</p>
              <p className="if-2">
                {mov?.genres?.map((gen) => (
                  <p key={gen.id}>{gen.name}</p>
                ))}
              </p>
            </div>
            <div className="if-3">
              <img src="/assets/star.png" alt="" />
              <p>{mov.vote}</p>
            </div>
            <div>
              <b>Casts: </b>
              {mov?.casts.slice(0, 5).map((cast) => cast.name + ", ")}
              ...
            </div>
            <div className="overview">
              <b>Overview: </b>
              {mov.overview}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default WatchList;
