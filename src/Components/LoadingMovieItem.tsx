import React from 'react';

const LoadingMovieItem = ({ m }: { m: number }) => {
	const randomWidth = () => Math.floor(Math.random() * 100) + 110;

	const randomNum = randomWidth();
	return (
		<li
			key={m}
			className='rounded-lg overflow-hidden flex flex-col gap-4 px-8 py-6 animate-pulse bg-white'
		>
			<div
				style={{
					width: randomNum,
				}}
				className={`bg-black/20 h-8 w-fit`}
			></div>
		</li>
	);
};

export default LoadingMovieItem;
