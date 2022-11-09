import React from 'react';

export const useLocalStorage = (key: string, initialValue: any) => {
	const [storedValue, setStoredValue] = React.useState(() => {
		const item = window.localStorage.getItem(key);
		return item ? JSON.parse(item) : initialValue;
	});

	React.useEffect(() => {
		window.localStorage.setItem(key, JSON.stringify(storedValue));
	}, [key, storedValue]);
	return [storedValue, setStoredValue];
};
