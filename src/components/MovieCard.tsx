import type { Movie } from "../types";

type MovieCardProps = {
  movie: Movie;
  isListView: boolean;
  onToggleFavorite: (id: number) => void;
};

export const MovieCard: React.FC<MovieCardProps> = ({
  movie,
  isListView,
  onToggleFavorite
}) => {
  return (
    <article className={isListView ? "movie-card movie-card--list" : "movie-card"}>
      <div className="movie-card__poster-wrapper">
        <img
          src={movie.posterUrl}
          alt={movie.title}
          className="movie-card__poster"
        />
      </div>
      <div className="movie-card__content">
        <header className="movie-card__header">
          <h3 className="movie-card__title">{movie.title}</h3>
          <span className="movie-card__year">{movie.year}</span>
        </header>
        <button
          type="button"
          className={
            movie.isFavorite
              ? "movie-card__favorite movie-card__favorite--active"
              : "movie-card__favorite"
          }
          onClick={() => onToggleFavorite(movie.id)}
          aria-pressed={movie.isFavorite}
          aria-label={
            movie.isFavorite
              ? `Убрать «${movie.title}» из избранного`
              : `Добавить «${movie.title}» в избранное`
          }
        >
          ★
        </button>
      </div>
    </article>
  );
};
