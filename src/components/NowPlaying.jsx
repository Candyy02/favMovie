/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { usePopMovies } from "../usePopMovies";
import "./TopRated.css";
import { useParams } from "react-router-dom";
import loadingImg from "../../public/assets/loading.gif";
import { useEffect } from "react";
export default function NowPlaying() {
  let { page } = useParams();
  const { movies, isLoading, error, totalPage } = usePopMovies(
    "now_playing",
    page
  );
  useEffect(() => {
    document.title = "Nowplaying";
  }, []);
  console.log(page);
  if (isLoading) {
    return (
      <img
        src={loadingImg}
        className="loading"
        style={{ backgroundColor: "transparent" }}
      />
    );
  } else
    return (
      <div className="toprated">
        <h1>Nowplaying</h1>
        <h2>Page {page}</h2>
        <div className="toprated-movies ">
          {!isLoading &&
            !error &&
            movies?.map((mov) => (
              <Link to={`/detail/${mov.id}`} key={mov.id} className="link">
                <Movie
                  key={mov.id}
                  year={mov.release_date}
                  name={mov.title}
                  posterImg={mov.backdrop_path}
                  voteAvg={mov.vote_average}
                  className="item"
                />
              </Link>
            ))}
        </div>
        <div className="move-page">
          <Link to={Number(page) > 1 ? `/nowplaying/${Number(page) - 1}` : "#"}>
            <div className="pre">
              <span>Previous</span>
              <img src="/assets/previous.png" alt="Previous button" />
            </div>
          </Link>
          <div className="page-of">
            Page {page} of {totalPage}
          </div>
          <Link to={`/nowplaying/${Number(page) + 1}`}>
            <div className="next">
              <img src="/assets/next-button.png" alt="Next button" />
              <span>Next</span>
            </div>
          </Link>
        </div>
      </div>
    );
}
function Movie({ year, name, posterImg, voteAvg }) {
  const imgURL = `https://image.tmdb.org/t/p/original${posterImg}`;
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
// function Loader() {
//   return <p className="loader">Loading...</p>;
// }
