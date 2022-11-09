import React from 'react';
import { Movie } from '../App';
import ThumbsDownIcon from './Icons/ThumbsDownIcon';
import { ThumbsUpIcon } from './Icons/ThumbsUpIcon';
import TrashIcon from './Icons/TrashIcon';

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
			className='relative h-fit rounded-lg flex flex-col gap-4 px-8 py-6 bg-white'
		>
			<span className='text-4xl text-ellipsis max-w-[10ch] overflow-hidden font-sans font-extrabold'>
				{movie.title}
			</span>

			<button
				className='group absolute right-6 text-red-600'
				onClick={() => onDelete(movie.id)}
			>
				<TrashIcon className='stroke-red-800 group-hover:scale-125 group-hover:rotate-6 transition-all duration-100 ease-in-out' />
			</button>
			<div className='mt-auto flex flex-col gap-4'>
				<span>{movie.category}</span>
				<div className='flex flex-row gap-4'>
					<div className='bg-red-50 flex-1 flex gap-8 items-center'>
						<button
							onClick={
								isDisliked
									? () => onRemoveDislike(movie.id)
									: () => onDislike(movie.id)
							}
						>
							<ThumbsDownIcon
								className={`w-12 h-12 duration-100 ease-in-out transition-all  ${
									isDisliked
										? 'fill-red-800 stroke-transparent'
										: 'stroke-gray-700 hover:stroke-red-700'
								} `}
							/>
						</button>
						<span className='text-4xl font-bold font-sans'>{dislikes}</span>
					</div>

					<div className='bg-emerald-50 flex-1 flex gap-8 items-center'>
						<button
							onClick={
								isLiked ? () => onRemoveLike(movie.id) : () => onLike(movie.id)
							}
						>
							<ThumbsUpIcon
								className={`w-12 h-12 duration-100 ease-in-out transition-all  ${
									isLiked
										? 'fill-emerald-700 stroke-transparent'
										: 'stroke-gray-700 hover:stroke-emerald-600'
								} `}
							/>
						</button>
						<span className='text-4xl font-bold font-sans'>{likes}</span>
					</div>
				</div>
			</div>
		</li>
	);
};

export default MovieItem;
