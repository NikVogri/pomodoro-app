import { INTERVAL_PERIOD_IN_SECONDS } from "../constants";
import { useEffect, useState } from "react";

export const useCountdownTimer = (timeInSecs: number) => {
	const [timerActive, setTimeActive] = useState<boolean>(false);
	const [timeLeftInSeconds, setTimeLeftInSeconds] = useState<number>(-1);

	useEffect(() => {
		setTimeLeftInSeconds(timeInSecs);
	}, []);

	const handleStartTimer = () => {
		setTimeActive(true);
	};

	const handleStopTimer = () => {
		setTimeActive(false);
		setTimeLeftInSeconds(timeInSecs);
	};

	useEffect(() => {
		let interval: NodeJS.Timer;

		if (timerActive) {
			interval = setInterval(() => {
				setTimeLeftInSeconds((oldTimeLeftInSeconds) => oldTimeLeftInSeconds && oldTimeLeftInSeconds - 1);
			}, INTERVAL_PERIOD_IN_SECONDS);
		}

		return () => clearInterval(interval);
	}, [timerActive]);

	return { timerActive, timeLeftInSeconds, startTimer: handleStartTimer, stopTimer: handleStopTimer };
};
