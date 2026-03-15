import { useMemo, useRef, useState } from "react";
import type { FavoriteFilter, Movie, ViewMode } from "./types";
import { MovieCard } from "./components/MovieCard";

const INITIAL_MOVIES: Movie[] = [
  {
    id: 1,
    title: "The Shawshank Redemption",
    year: 1994,
    posterUrl:
      "https://upload.wikimedia.org/wikipedia/en/8/81/ShawshankRedemptionMoviePoster.jpg",
    isFavorite: true
  },
  {
    id: 2,
    title: "The Godfather",
    year: 1972,
    posterUrl:
      "https://static.wikia.nocookie.net/the-godfather/images/9/93/The_Godfather.webp/revision/latest?cb=20250721185111&path-prefix=ru",
    isFavorite: false
  },
  {
    id: 3,
    title: "Inception",
    year: 2010,
    posterUrl:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_FMjpg_UX1000_.jpg",
    isFavorite: false
  },
  {
    id: 4,
    title: "Pulp Fiction",
    year: 1994,
    posterUrl:
      "https://m.media-amazon.com/images/M/MV5BYTViYTE3ZGQtNDBlMC00ZTAyLTkyODMtZGRiZDg0MjA2YThkXkEyXkFqcGc@._V1_.jpg",
    isFavorite: true
  },
  {
    id: 5,
    title: "Interstellar",
    year: 2014,
    posterUrl:
      "https://upload.wikimedia.org/wikipedia/ru/c/c3/Interstellar_2014.jpg",
    isFavorite: false
  }
];

export const App: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>(INITIAL_MOVIES);
  const [favoriteFilter, setFavoriteFilter] = useState<FavoriteFilter>("all");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const searchRef = useRef<HTMLInputElement | null>(null);

  const handleToggleFavorite = (id: number) => {
    setMovies((prev) =>
      prev.map((movie) =>
        movie.id === id
          ? {
              ...movie,
              isFavorite: !movie.isFavorite
            }
          : movie
      )
    );
  };

  const handleChangeFilter = (filter: FavoriteFilter) => {
    setFavoriteFilter(filter);
  };

  const handleChangeViewMode = (mode: ViewMode) => {
    setViewMode(mode);
  };

  const filteredMovies = useMemo(() => {
    const searchTerm = searchRef.current?.value?.trim().toLowerCase() ?? "";

    return movies.filter((movie) => {
      if (favoriteFilter === "favorites" && !movie.isFavorite) {
        return false;
      }

      if (!searchTerm) {
        return true;
      }

      return movie.title.toLowerCase().includes(searchTerm);
    });
  }, [movies, favoriteFilter]);

  const hasMovies = filteredMovies.length > 0;

  return (
    <div className="page">
      <header className="page-header">
        <h1 className="page-title">Каталог фильмов</h1>
      </header>

      <section className="controls">
        <div className="controls__group">
          <span className="controls__label">Фильтр:</span>
          <button
            type="button"
            className={
              favoriteFilter === "all"
                ? "button button--primary"
                : "button button--outline"
            }
            onClick={() => handleChangeFilter("all")}
          >
            Все
          </button>
          <button
            type="button"
            className={
              favoriteFilter === "favorites"
                ? "button button--primary"
                : "button button--outline"
            }
            onClick={() => handleChangeFilter("favorites")}
          >
            Только избранные
          </button>
        </div>

        <div className="controls__group">
          <span className="controls__label">Поиск:</span>
          <input
            ref={searchRef}
            type="text"
            className="input"
            placeholder="Введите название фильма"
            onChange={() => {
              setMovies((prev) => [...prev]);
            }}
          />
        </div>

        <div className="controls__group">
          <span className="controls__label">Вид:</span>
          <button
            type="button"
            className={
              viewMode === "grid"
                ? "button button--primary"
                : "button button--outline"
            }
            onClick={() => handleChangeViewMode("grid")}
          >
            Плитка
          </button>
          <button
            type="button"
            className={
              viewMode === "list"
                ? "button button--primary"
                : "button button--outline"
            }
            onClick={() => handleChangeViewMode("list")}
          >
            Список
          </button>
        </div>
      </section>

      <main>
        {hasMovies ? (
          <div
            className={
              viewMode === "grid" ? "movies movies--grid" : "movies movies--list"
            }
          >
            {filteredMovies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                isListView={viewMode === "list"}
                onToggleFavorite={handleToggleFavorite}
              />
            ))}
          </div>
        ) : (
          <p className="empty-state">Фильмов нет</p>
        )}
      </main>
    </div>
  );
};
