// format number to K, M, B, T
export function formatNumber(num: number) {
	if (num >= 1000) {
		const units = ['K', 'M', 'B', 'T'];
		const order = Math.floor(Math.log(num) / Math.log(1000));
		const unitname = units[order - 1];
		num = Math.floor(num / 1000 ** order);
		return num + unitname;
	}
	return num;
}

export function getPercent(num: number, total: number) {
	// return with 0 decimal
	return Math.floor((num / total) * 100);
}

export const themeColors = [
	{
		name: 'purple',
		backgroundColor: 'bg-purple-200',
		borderTopColor: 'border-t-purple-200',
	},
	{
		name: 'green',
		backgroundColor: 'bg-green-200',
		borderTopColor: 'border-t-green-200',
	},
	{
		name: 'red',
		backgroundColor: 'bg-red-200',
		borderTopColor: 'border-t-red-200',
	},
	{
		name: 'yellow',
		backgroundColor: 'bg-yellow-200',
		borderTopColor: 'border-t-yellow-200',
	},
	{
		name: 'blue',
		backgroundColor: 'bg-sky-200',
		borderTopColor: 'border-t-sky-200',
	},
	{
		name: 'gray',
		backgroundColor: 'bg-neutral-200',
		borderTopColor: 'border-t-neutral-200',
	},
];

export const pickColor = (color: string) => {
	const colorObj = themeColors.find((c) => c.name === color);
	if (colorObj) {
		return colorObj;
	}
	return themeColors[0];
};
