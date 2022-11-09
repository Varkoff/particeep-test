import React from 'react';
import './reset.css';
import './index.css';
import { getMovies } from './assets/movies';
import MovieItem from './Components/MovieItem';
import LoadingMovieItem from './Components/LoadingMovieItem';
import { ErrorBoundary } from 'react-error-boundary';
import { useLocalStorage } from './hooks/useLocalStorage';
export type Movie = Awaited<ReturnType<typeof getMovies>>[number];
export const App = () => {
	const [movies, setMovies] = React.useState<Movie[]>([]);
	const [loading, setLoading] = React.useState(true);

	const fetchMovies = async () => {
		const data = await getMovies();
		setMovies(data);
		setLoading(false);
	};
	React.useEffect(() => {
		// Fetch Movies on initial render
		fetchMovies();
	}, []);

	return (
		<div className='w-full md:max-w-7xl mx-auto py-16 px-8'>
			{loading ? (
				<LoadingSkeleton />
			) : (
				<ErrorBoundary
					fallback={
						<div
							role='alert'
							className='flex flex-col gap-4 px-8 py-6 bg-red-100'
						>
							<h2 className='text-red-600 text-3xl font-bold'>Oops 😕</h2>
							<p className='text-red-800'>Une erreur est survenue.</p>
						</div>
					}
				>
					<MovieList movies={movies} />
				</ErrorBoundary>
			)}
		</div>
	);
};

export const LoadingSkeleton = () => {
	// Generate array with 10 items
	const fakeMovies = Array.from(Array(10).keys());

	return (
		<ul className='card-wrapper'>
			{fakeMovies.map((m) => (
				<LoadingMovieItem m={m} key={m} />
			))}
		</ul>
	);
};
export const MovieList: React.FC<{ movies: Movie[] }> = ({ movies }) => {
	const [deletedMovies, setDeletedMovies] = useLocalStorage(
		'deletedMovies',
		[]
	);
	const [likedMovies, setLikedMovies] = useLocalStorage('likedMovies', []);
	const [dislikedMovies, setDislikedMovies] = useLocalStorage(
		'dislikedMovies',
		[]
	);

	function deleteMovie(movieId: string) {
		setDeletedMovies((oldMovies: string[]) => [...oldMovies, movieId]);
	}

	function restoreMovie(movieId: string) {
		setDeletedMovies((oldMovies: string[]) =>
			oldMovies.filter((id) => id !== movieId)
		);
	}

	function likeMovie(movieId: string) {
		setLikedMovies((oldMovies: string[]) => [...oldMovies, movieId]);
	}

	function removeLikeFromMovie(movieId: string) {
		setLikedMovies((oldMovies: string[]) =>
			oldMovies.filter((id) => id !== movieId)
		);
	}

	function dislikeMovie(movieId: string) {
		setDislikedMovies((oldMovies: string[]) => [...oldMovies, movieId]);
	}

	function removeDislikeFromMovie(movieId: string) {
		setDislikedMovies((oldMovies: string[]) =>
			oldMovies.filter((id) => id !== movieId)
		);
	}

	const deletedMoviesData = movies.filter((m) => deletedMovies.includes(m.id));
	return (
		<div className='flex flex-row gap-12'>
			<div className='w-full max-w-[120px]'>
				{deletedMoviesData.length > 0 ? (
					<>
						<p className='mb-4'>Films supprimés</p>
						<ul className='flex flex-col gap-4'>
							{deletedMoviesData.map((m) => (
								<li
									className='text-sm text-gray-700 hover:text-green-800'
									key={m.id}
								>
									<button
										className='text-start text-ellipsis overflow-hidden max-w-[20ch] [line-clamp:1] [-webkit-line-clamp: 1] [display:-webkit-box]'
										onClick={() => restoreMovie(m.id)}
									>
										{m.title}
									</button>
								</li>
							))}
						</ul>
					</>
				) : null}
			</div>
			<ul className='card-wrapper w-full'>
				{movies
					.filter((movie) => !deletedMovies.includes(movie.id))
					.map((movie) => (
						<MovieItem
							movie={movie}
							key={movie.id}
							onDelete={deleteMovie}
							onLike={likeMovie}
							onDislike={dislikeMovie}
							onRemoveLike={removeLikeFromMovie}
							onRemoveDislike={removeDislikeFromMovie}
							isLiked={likedMovies.includes(movie.id)}
							isDisliked={dislikedMovies.includes(movie.id)}
						/>
					))}
			</ul>
		</div>
	);
};

export default App;
