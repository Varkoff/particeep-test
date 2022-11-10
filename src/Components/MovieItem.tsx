import React from 'react';
import { Movie } from '../App';
import { formatNumber } from '../utils';
import ThumbsDownIcon from './Icons/ThumbsDownIcon';
import { ThumbsUpIcon } from './Icons/ThumbsUpIcon';
import TrashIcon from './Icons/TrashIcon';
import MovieLikeRatio from './MovieLikeRatio';

const MovieItem = ({
	movie,
	coloredTheme,
	onDelete,
	isDisliked,
	isLiked,
	onDislike,
	onLike,
	onRemoveDislike,
	onRemoveLike,
}: {
	movie: Movie;
	coloredTheme: string;
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
			className={`shadow-lg shadow-black/20 border-t-8 ${coloredTheme} border-r-0 transition-all duration-100 relative h-fit flex flex-col gap-4 px-8 py-6 bg-white`}
		>
			<button
				className='group absolute right-6 text-red-600'
				onClick={() => onDelete(movie.id)}
			>
				<TrashIcon className='stroke-red-800 group-hover:scale-125 group-hover:rotate-6 transition-all duration-100 ease-in-out' />
			</button>
			<article className='flex flex-col gap-4 mb-12'>
				<h3 className='text-4xl text-ellipsis max-w-[17ch] whitespace-nowrap overflow-hidden font-sans font-extrabold'>
					{movie.title}
				</h3>
				<span className='text-slate-700 text-lg'>{movie.category}</span>
			</article>
			<div className='mt-auto flex flex-col gap-4'>
				<div className='flex flex-row gap-4'>
					<button
						className={`transition-all duration-100 flex-1 flex gap-2 items-center ${
							isDisliked ? 'bg-red-100' : 'bg-red-50 hover:bg-red-100 '
						}`}
						onClick={
							isDisliked
								? () => onRemoveDislike(movie.id)
								: () => onDislike(movie.id)
						}
					>
						<ThumbsDownIcon
							className={`flex-grow flex-shrink-0 w-12 h-12 duration-100 ease-in-out transition-all  ${
								isDisliked
									? 'fill-red-800 -rotate-12 scale-125 stroke-transparent'
									: 'stroke-gray-700 hover:stroke-red-700'
							} `}
						/>
						<span className='text-4xl font-bold font-sans ml-auto'>
							{formatNumber(dislikes)}
						</span>
					</button>

					<button
						className={`transition-all duration-100 flex-1 flex gap-2 items-center  ${
							isLiked ? 'bg-emerald-100' : 'bg-emerald-50 bg:hover-emerald-100'
						}`}
						onClick={
							isLiked ? () => onRemoveLike(movie.id) : () => onLike(movie.id)
						}
					>
						<ThumbsUpIcon
							className={`flex-grow flex-shrink-0 w-12 h-12 duration-100 ease-in-out transition-all  ${
								isLiked
									? 'fill-emerald-700 -rotate-12 scale-125 stroke-transparent'
									: 'stroke-gray-700  hover:stroke-emerald-600'
							} `}
						/>
						<span className='text-4xl font-bold font-sans ml-auto'>
							{formatNumber(likes)}
						</span>
					</button>
				</div>
				<MovieLikeRatio likes={likes} dislikes={dislikes} />
			</div>
		</li>
	);
};

export default MovieItem;
