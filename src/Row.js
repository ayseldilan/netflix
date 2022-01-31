import React, { useState, useEffect } from "react";
import axios from "./axios.js";
import './Row.css';
// import Youtube from "react-youtube";
const baseImgUrl = "https://image.tmdb.org/t/p/original";


const Row = ({ title, fetchUrl, isLargeRow }) => {

  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  // Options for react-youtube
  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };
  const handleClick = async (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      let trailerurl = await axios.get(`/movie/${movie?.id}/videos?api_key=${process.env.REACT_APP_API_KEY}`);
      setTrailerUrl(trailerurl.data.results[0]?.key);
    }
  }
  // const url = "https://api.themoviedb.org/3";
  // const fetchUrl_full= `${url}${fetchUrl}`;

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row__posters">
        {movies.map((movie) => (
          <img
            key={movie.id}
            className={`row__poster ${isLargeRow && "row__posterLarge"}`}
            src={`${baseImgUrl}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
            alt={movie.name}
            onClick={handleClick.bind(this, movie)}
          />
        ))}
      </div>
      {/* {trailerUrl && <Youtube videoId={trailerUrl} opts={opts} />} */}
    </div>
  );
};

export default Row;