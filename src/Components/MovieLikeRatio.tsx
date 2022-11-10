import React from 'react';
import { getPercent } from '../utils';

const MovieLikeRatio: React.FC<{ likes: number; dislikes: number }> = ({
	likes,
	dislikes,
}) => {
	const total = likes + dislikes;
	const likePercent = getPercent(likes, total);
	const dislikePercent = getPercent(dislikes, total);

	const likeWidth = likePercent + '%';
	const dislikeWidth = dislikePercent + '%';

	const commonClasses = `flex-grow transition-all overflow-hidden duration-200 h-2`;
	return (
		<div className='flex flex-row w-full rounded-lg overflow-hidden'>
			<div
				style={{ width: likeWidth }}
				className={`bg-emerald-500 ${commonClasses} ${likeWidth}`}
			></div>
			<div
				style={{ width: dislikeWidth }}
				className={`bg-red-700 ${commonClasses} ${dislikeWidth} `}
			></div>
		</div>
	);
};

export default MovieLikeRatio;
