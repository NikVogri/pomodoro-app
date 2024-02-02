const secondsToMs = (seconds: number): number => {
	return seconds * 1000;
};

export const secondsHHMMSS = (seconds: number) => {
	if (seconds <= 0) return "00:00:00";
	return new Date(secondsToMs(seconds)).toISOString().slice(11, 19);
};
