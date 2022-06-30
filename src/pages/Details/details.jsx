import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Container } from './stylesDetails';

export function Details() {
  const [movieDetails, setMovieDetails] = useState({});
  const [loading, setLoading] = useState(true);

  const { id } = useParams();
  const navigate = useNavigate();

  const image_path = 'https://image.tmdb.org/t/p/w500';

  useEffect(() => {
    const URL = `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_MOVIE_KEY}&language=en-US&page=1`;
    axios
      .get(URL)
      .then(({ data }) => {
        const { title, overview, poster_path, release_date } = data;
        const movieDetails = {
          id,
          title,
          sinopse: overview,
          image: `${image_path}${poster_path}`,
          releaseDate: release_date,
        };

        setMovieDetails(movieDetails);
        setLoading(false);
      })
      .catch((err) => {
        console.error('ops! ocorreu um erro' + err);
      });
  }, [id]);

  const handleLastPage = () => {
    navigate(-1);
  };

  return (
    (loading && <h2 style={{ textAlign: 'center' }}>Carregando</h2>) || (
      <Container>
        <div className="movie">
          <img src={movieDetails.image} alt={movieDetails.sinopse} />
        </div>
        <div className="details">
          <h1>{movieDetails.title}</h1>
          <span>Sinopse: {movieDetails.sinopse}</span>
          <span className="release-date">
            Release date: {movieDetails.releaseDate}
          </span>
          <button onClick={handleLastPage}>Go Back</button>
        </div>
      </Container>
    )
  );
}
