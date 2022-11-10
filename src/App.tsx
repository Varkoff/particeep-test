import React from 'react';
import './reset.css';
import './index.css';
import { getMovies } from './assets/movies';
import MovieItem from './Components/MovieItem';
import LoadingMovieItem from './Components/LoadingMovieItem';
import { ErrorBoundary } from 'react-error-boundary';
import { useLocalStorage } from './hooks/useLocalStorage';
import { pickColor, themeColors } from './utils';
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
	const [theme, setTheme] = useLocalStorage('theme', 'purple');

	const [deletedMovies, setDeletedMovies] = useLocalStorage(
		'deletedMovies',
		[]
	);
	const [likedMovies, setLikedMovies] = useLocalStorage('likedMovies', []);
	const [dislikedMovies, setDislikedMovies] = useLocalStorage(
		'dislikedMovies',
		[]
	);

	const [selectedCategories, setSelectedCategories] = useLocalStorage(
		'selectedCategories',
		[]
	);

	const [pagination, setPagination] = React.useState(0);
	const [itemsPerPage, setItemsPerPage] = React.useState(10);

	function changePage(page: number) {
		if (page < 0) {
			return;
		}
		if (page > movies.length / itemsPerPage) {
			return;
		}

		setPagination(page);
	}

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

	function toggleCategories(category: string) {
		if (category === 'all') {
			setSelectedCategories([]);
			return;
		}

		if (!selectedCategories.includes(category)) {
			setSelectedCategories((oldCategories: string[]) => [
				...oldCategories,
				category,
			]);
		} else {
			setSelectedCategories((oldCategories: string[]) =>
				oldCategories.filter((c) => c !== category)
			);
		}
	}

	const deletedMoviesData = movies.filter((m) => deletedMovies.includes(m.id));
	const moviesData = movies.filter((m) => !deletedMovies.includes(m.id));
	// Creating a new Set to remove duplicates
	const categories = [...new Set(moviesData.map((m) => m.category))];

	const filteredMoviesData =
		selectedCategories.length === 0
			? moviesData
			: moviesData.filter((m) => selectedCategories.includes(m.category));

	const paginatedFilteredMoviesData = filteredMoviesData.slice(
		pagination * itemsPerPage,
		(pagination + 1) * itemsPerPage
	);

	const availablePages = Array.from(
		Array(Math.ceil(filteredMoviesData.length / itemsPerPage)).keys()
	);

	const bgColoredTheme = pickColor(theme).backgroundColor;
	const borderTopColoredTheme = pickColor(theme).borderTopColor;

	return (
		<section className='flex flex-col gap-12'>
			<div className=''>
				<h3 className='text-3xl text-black font-extrabold font-mono pb-12'>
					Catégories
				</h3>
				<div className='flex gap-8 flex-wrap'>
					<button
						onClick={() => toggleCategories('all')}
						className={`text-black border-2 border-black px-6 py-4 w-fit ${
							selectedCategories.length === 0 ? bgColoredTheme : 'bg-white'
						}`}
					>
						Tous les films
					</button>
					{categories.map((c) => (
						<button
							onClick={() => toggleCategories(c)}
							className={`text-black border-2 border-black px-6 py-4 w-fit ${
								selectedCategories.includes(c) ? bgColoredTheme : ' bg-white'
							}`}
						>
							{c}
						</button>
					))}
				</div>
			</div>
			<div className='flex flex-wrap flex-row gap-24'>
				<div className='w-fit'>
					<h3 className='text-3xl text-black font-extrabold font-mono pb-12'>
						Movie par page
					</h3>
					<div className='flex gap-8 flex-wrap'>
						{[4, 8, 12].map((c) => (
							<button
								onClick={() => {
									setItemsPerPage(c);
									changePage(0);
								}}
								className={`${
									itemsPerPage === c ? bgColoredTheme : 'white'
								} text-black border-2 border-black px-6 py-4 w-fit`}
							>
								{c}
							</button>
						))}
					</div>
				</div>
				<div className='w-fit'>
					<h3 className='text-3xl text-black font-extrabold font-mono pb-12'>
						Page sélectionnée
					</h3>
					<div className='flex gap-8 flex-wrap'>
						{availablePages.map((c) => (
							<button
								onClick={() => changePage(c)}
								className={` text-black border-2 border-black px-6 py-4 w-fit ${
									pagination === c ? bgColoredTheme : ' bg-white'
								}`}
							>
								{c + 1}
							</button>
						))}
					</div>
				</div>
				<div className='w-fit'>
					<h3 className='text-3xl text-black font-extrabold font-mono pb-12'>
						Thème
					</h3>
					<div className='flex gap-8 flex-wrap'>
						{themeColors.map((c) => (
							<button
								onClick={() => setTheme(c.name)}
								className={`w-8 h-8 rounded-full ${c.backgroundColor}  ${
									theme === c.name ? 'border-black border' : ' '
								}`}
							></button>
						))}
					</div>
				</div>
			</div>
			<div className='flex flex-col md:flex-row gap-12'>
				<div className='w-full max-w-[120px]'>
					{deletedMoviesData.length > 0 ? (
						<>
							<p className='mb-4 font-bold'>Corbeille</p>
							<ul className='flex flex-row md:flex-col flex-wrap gap-4'>
								{deletedMoviesData.map((m) => (
									<li
										className='w-fit text-sm text-gray-700 underline'
										key={m.id}
									>
										<button
											className='text-start text-ellipsis overflow-hidden md:max-w-[20ch] [line-clamp:1] [-webkit-line-clamp: 1] [display:-webkit-box]'
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
					{paginatedFilteredMoviesData.map((movie) => (
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
							coloredTheme={borderTopColoredTheme}
						/>
					))}
				</ul>
			</div>
		</section>
	);
};

export default App;
