const minutesToMs = (minutes: number) => {
	return minutes * 60 * 1000;
};

export const minutesHHMMSS = (minutes: number) => {
	return new Date(minutesToMs(minutes)).toISOString().slice(11, 19);
};
