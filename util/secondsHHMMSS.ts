const secondsToMs = (seconds: number): number => {
	return seconds * 1000;
};

export const secondsHHMMSS = (seconds: number) => {
	return new Date(secondsToMs(seconds)).toISOString().slice(11, 19);
};
