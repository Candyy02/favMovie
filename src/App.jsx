/* eslint-disable react/prop-types */
import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./App.css";
import "./reset.css";
import { Route, Routes } from "react-router-dom";
import Homepage from "./components/Homepage";
import PageNotFound from "./components/PageNotFound";
import SearchResult from "./components/SearchResult";
import Detail from "./components/Detail";
import WatchList from "./components/WatchList";
import TopRated from "./components/TopRated";
import Upcoming from "./components/Upcoming";
import Popular from "./components/Popular";
import NowPlaying from "./components/NowPlaying";
function App() {
  const [query, setQuery] = useState("");
  return (
    <div className="App row">
      <SideBar />
      <div className="col-lg-10 main-container">
        <NavBar query={query} setQuery={setQuery}></NavBar>

        <Routes>
          <Route path="/" element={<Homepage />}></Route>
          <Route path="/search" element={<SearchResult />}></Route>
          <Route path="/watchlist" element={<WatchList />}></Route>
          <Route path="/detail/:id" element={<Detail />}></Route>
          <Route path="/toprated/:page" element={<TopRated />}></Route>
          <Route path="/upcoming/:page" element={<Upcoming />}></Route>
          <Route path="/popular/:page" element={<Popular />}></Route>
          <Route path="/nowplaying/:page" element={<NowPlaying />}></Route>
          <Route path="*" element={<PageNotFound />}></Route>
        </Routes>
      </div>
    </div>
  );
}
function SideBar() {
  return (
    <div className="side-bar col-lg-2">
      <NavLink to="/">
        <img src="/assets/logo.svg" alt="" />
      </NavLink>
      <NavLink to="/watchlist">
        <img src="/assets/add-button.png" alt="" />
      </NavLink>
      <img src="/assets/icon-nav-movies.svg" alt="" />
      <img src="/assets/icon-nav-tv-series.svg" alt="" />
    </div>
  );
}
function NavBar({ query, setQuery }) {
  const navigate = useNavigate();
  return (
    <div className="nav-bar con-lg-10">
      <img src="/assets/icon-search.svg" alt="" />
      <input
        type="text"
        placeholder="Search movies or TV series"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key == "Enter") navigate(`/search?title=${query}`);
        }}
      />
      <Link to={`/search?title=${query}`}>
        <button>Search</button>
      </Link>
    </div>
  );
}

export default App;
