/* eslint-disable react/prop-types */
import "./Homepage.scss";
import { usePopMovies } from "../usePopMovies";
import { Link } from "react-router-dom";
import { useEffect } from "react";

function Homepage() {
  return <Main />;
}
function Main() {
  return (
    <div className="main">
      <PopularMovie
        sectionName={"Top rated 🔥"}
        type={"top_rated"}
        link={"toprated"}
      />
      <UpcomingMovie sectionName={"Upcoming ⬆️"} type={"upcoming"} />
      <PopularMovie sectionName={"Popular"} type={"popular"} />
      <UpcomingMovie sectionName={"Now playing ⬆️"} type={"now_playing"} />
    </div>
  );
}
function PopularMovie({ type, sectionName, page = 1 }) {
  const { movies, isLoading, error } = usePopMovies(type, page);
  console.log(movies);
  useEffect(() => {
    document.title = "Homepage";
  }, []);
  const container = document.querySelector("#tr");
  // where "container" is the id of the container

  container?.addEventListener("wheel", function (e) {
    if (e.deltaY > 0) {
      container.scrollLeft += 500;
      e.preventDefault();
      // prevenDefault() will help avoid worrisome
      // inclusion of vertical scroll
    } else {
      container.scrollLeft -= 500;
      e.preventDefault();
    }
  });

  return (
    <>
      <div className="header">
        <h2>{sectionName}</h2>
        <Link to={`${type.replace("_", "")}/1`} className="link">
          See more
        </Link>
      </div>
      <div className="pop-movies" id="tr">
        {isLoading && <Loader />}
        {!isLoading &&
          !error &&
          movies.map((mov) => (
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
    </>
  );
}
function UpcomingMovie({ type, sectionName }) {
  const { movies } = usePopMovies(type, sectionName);
  return (
    <div className="upcoming">
      <>
        <div className="header">
          <h2>{sectionName}</h2>
          <Link to={`${type.replace("_", "")}/1`} className="link">
            See more
          </Link>
        </div>
        <div className="upcoming-movies">
          {movies?.map((mov) => (
            <Link to={`/detail/${mov.id}`} key={mov.id} className="link">
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
      </>
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
function Loader() {
  return <p className="loader">Loading...</p>;
}

export default Homepage;
