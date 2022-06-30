import { useState, useEffect } from 'react';
import { Container, Movie, MovieList } from './styles';
import axios from 'axios';
import { Link } from 'react-router-dom';

export function Home() {
  const [movies, setMovies] = useState([]);

  const image_path = 'https://image.tmdb.org/t/p/w500';

  useEffect(() => {
    const URL = `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_MOVIE_KEY}&language=en-US&page=1`;
    axios
      .get(URL)
      .then(({ data }) => {
        //console.log(data.results);
        setMovies(data.results);
      })
      .catch((err) => {
        console.error('ops! ocorreu um erro' + err);
      });
  }, []);

  return (
    <Container>
      <h1>Movies</h1>
      <MovieList>
        {movies.map((movie) => {
          return (
            <Movie key={movie.id}>
              <Link to={`/details/${movie.id}`}>
                <img
                  src={`${image_path}${movie.poster_path}`}
                  alt={movie.title}
                />
              </Link>
              <span>{movie.title}</span>
            </Movie>
          );
        })}
      </MovieList>
    </Container>
  );
}
