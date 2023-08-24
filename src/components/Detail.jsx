import { useParams } from "react-router-dom";
import "./Detail.css";
import { useGetDetail } from "../useGetDetail";
import { useGetCasts } from "../useGetCasts";
import { useLocalStorageState } from "../useLocalStorageState";
import { useEffect, useRef } from "react";
import loadingImg from "../../public/assets/loading.gif";
function Detail() {
  const [movie, setAddMovie] = useLocalStorageState([], "watchlist");
  const { id } = useParams();
  useEffect(() => {
    document.title = "Movie Detail";
  }, []);
  const [movieDetail, trailer, loading] = useGetDetail(id);
  const [casts] = useGetCasts(id);
  const imgURL = `https://image.tmdb.org/t/p/original${movieDetail.poster_path}`;
  const noti = useRef();
  const notiAdded = useRef();

  //   let lg = movieDetail.spoken_languages;
  function handleAddMovie(e) {
    const newMovie = {
      id: id,
      title: movieDetail.title,
      img: imgURL,
      overview: movieDetail.overview,
      vote: movieDetail.vote_average,
      genres: movieDetail.genres,
      casts: casts.cast,
      length: movieDetail.runtime,
      year: movieDetail.release_date?.split("-")?.at(0),
    };

    if (!movie.find((mov) => mov.id === id)) {
      setAddMovie([...movie, newMovie]);
      e.target.setAttribute("disabled", "");
      noti?.current?.classList.remove("hidden");
    } else {
      notiAdded?.current?.classList.remove("hidden");
    }
  }

  if (!loading)
    return (
      <>
        <div className="detail">
          <div className="img-ctn">
            <img src={imgURL} alt="" loading="lazy" />
            <div className="watch-list">
              <button
                className="button-87"
                role="button"
                onClick={handleAddMovie}
              >
                Add to WatchList
              </button>
              <div
                className="alert alert-success alert-dismissible fade in hidden"
                ref={noti}
              >
                <a
                  href="#"
                  className="close"
                  data-dismiss="alert"
                  aria-label="close"
                >
                  &times;
                </a>
                <strong>This movie is added to WatchList!</strong>
              </div>
              <div
                className="alert alert-info alert-dismissible fade in hidden"
                ref={notiAdded}
              >
                <a
                  href="#"
                  className="close"
                  data-dismiss="alert"
                  aria-label="close"
                >
                  &times;
                </a>
                <strong>You have added this movie before.</strong>
              </div>
            </div>
          </div>
          <div className="description">
            <div className="title">
              <h1>{movieDetail.title}</h1>
              <p className="point">
                {Number(movieDetail.vote_average)?.toFixed(1)}
              </p>
            </div>
            <p className="tag-name">{movieDetail.tagline}</p>
            <table>
              <thead>
                <tr>
                  <th>Length</th>
                  <th>Language</th>
                  <th>Year</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{movieDetail.runtime} min.</td>
                  <td>{movieDetail.spoken_languages?.at(0).english_name}</td>
                  <td>{movieDetail.release_date?.split("-")?.at(0)}</td>
                  <td>{movieDetail.status}</td>
                </tr>
              </tbody>
            </table>
            <div className="genres">
              <h5>Genres</h5>
              <div>
                {movieDetail.genres?.map((gen, i) => (
                  <p key={i}>{gen.name}</p>
                ))}
              </div>
            </div>
            <div className="summary">
              <h5>Summary</h5>
              <p>{movieDetail.overview}</p>
            </div>
            <div className="casts">
              <h5>Cast</h5>
              <div>
                {casts?.cast?.slice(0, 25).map((actor, i) => (
                  <p key={i}>{actor.name}</p>
                ))}{" "}
                , ...
              </div>
            </div>
          </div>
        </div>
        <div className="trailer">
          <h2>Trailer</h2>
          <iframe
            width="1200"
            height="800"
            src={`https://www.youtube.com/embed/${trailer}?autoplay=1&mute=1`}
          ></iframe>
        </div>
      </>
    );
  else {
    return (
      <img
        src={loadingImg}
        className="loading"
        style={{ backgroundColor: "transparent" }}
      />
    );
  }
}

export default Detail;
