import React from 'react';
import { Movie } from '../App';

const MovieItem = ({
	movie,
	onDelete,
	isDisliked,
	isLiked,
	onDislike,
	onLike,
	onRemoveDislike,
	onRemoveLike,
}: {
	movie: Movie;
	onDelete: (movieId: string) => void;
	onLike: (movieId: string) => void;
	onDislike: (movieId: string) => void;
	onRemoveLike: (movieId: string) => void;
	onRemoveDislike: (movieId: string) => void;
	isLiked: boolean;
	isDisliked: boolean;
}) => {
	const likes = movie.likes + (isLiked ? 1 : 0);
	const dislikes = movie.dislikes + (isDisliked ? 1 : 0);
	return (
		<li
			key={movie.id}
			className='rounded-lg flex flex-col gap-4 px-8 py-6 bg-white'
		>
			<span className='text-4xl text-ellipsis max-w-[10ch] overflow-hidden font-sans font-extrabold'>
				{movie.title}
			</span>
			<div className='flex flex-col gap-4'>
				<span>{movie.category}</span>
				<div className='flex flex-col gap-4'>
					<button
						onClick={
							isDisliked
								? () => onRemoveDislike(movie.id)
								: () => onDislike(movie.id)
						}
						className='bg-red-800 text-white text-2xl'
					>
						{dislikes} {isDisliked ? '❌' : '👎'}
					</button>
					<button
						onClick={
							isLiked ? () => onRemoveLike(movie.id) : () => onLike(movie.id)
						}
						className='bg-emerald-700 text-white text-2xl'
					>
						{likes} {isLiked ? '❤️' : '👍'}
					</button>
				</div>
			</div>
			<button
				className='mt-auto ml-auto text-red-600'
				onClick={() => onDelete(movie.id)}
			>
				Supprimer
			</button>
		</li>
	);
};

export default MovieItem;
