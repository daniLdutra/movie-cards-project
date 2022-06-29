import { useState, useEffect } from 'react';
import { Container, Movie, MovieList } from '../styles';
import axios from 'axios';

export function Home() {
  const [movies, setMovies] = useState([]);

  const URL = `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_MOVIE_KEY}&language=en-US&page=1`;

  const image_path = 'https://image.tmdb.org/t/p/w500';

  useEffect(() => {
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
              <a href="https://br.web.img3.acsta.net/videothumbnails/189/153/18915394_20131022151706319.jpg">
                <img
                  src={`${image_path}${movie.poster_path}`}
                  alt={movie.title}
                />
              </a>
              <span>{movie.title}</span>
            </Movie>
          );
        })}
      </MovieList>
    </Container>
  );
}
