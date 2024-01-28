export const timestampToHumanReadableDate = (msTimestamp: number) => {
	const date = new Date(msTimestamp);

	const options: Intl.DateTimeFormatOptions = {
		year: "numeric",
		month: "long",
		day: "numeric",
	};

	// undefined defaults to the locale of the user
	return date.toLocaleDateString(undefined, options);
};
