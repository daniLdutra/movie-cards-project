import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export function Details() {
  const [movieDetails, setMovieDetails] = useState({});

  const { id } = useParams();

  const image_path = 'https://image.tmdb.org/t/p/w500';

  useEffect(() => {
    const URL = `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_MOVIE_KEY}&language=en-US&page=1`;
    axios
      .get(URL)
      .then(({ data }) => {

        const {title, overview, poster_path,release_date} = data

        const movieDetails = {
          id,
          title,
          sinopse: overview,
          image: `${image_path}${poster_path}`,
          releaseDate: release_date,
        };
        setMovieDetails(movieDetails);
        console.log(movieDetails);
      })
      .catch((err) => {
        console.error('ops! ocorreu um erro' + err);
      });
  }, [id]);

  return (
    <div>
      <h1>Página de detalhes</h1>;
    </div>
  );
}
