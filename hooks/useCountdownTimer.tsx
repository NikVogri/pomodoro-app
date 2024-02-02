import { INTERVAL_PERIOD_IN_SECONDS } from "../constants";
import { useEffect, useRef, useState } from "react";
import { useAppStateChange } from "./useAppStateChange";

export const useCountdownTimer = (timeInSecs: number) => {
	const [timerActive, setTimeActive] = useState<boolean>(false);
	const [timeLeftInSeconds, setTimeLeftInSeconds] = useState<number>(0);

	const timeAtFocusLost = useRef<number>();

	useAppStateChange({
		onAppActive: () => {
			if (!timeAtFocusLost.current) return;

			const deltaInMs = Date.now() - timeAtFocusLost.current;
			const deltaInSeconds = Math.floor(deltaInMs / 1000);

			handleReduceTimeLeftBy(deltaInSeconds);
			timeAtFocusLost.current = undefined;
		},
		onAppBackground: () => {
			timeAtFocusLost.current = Date.now();
		},
	});

	useEffect(() => {
		setTimeLeftInSeconds(timeInSecs);
	}, []);

	const handleStartTimer = () => {
		setTimeActive(true);
	};

	const handleStopTimer = () => {
		setTimeActive(false);
	};

	const handleReduceTimeLeftBy = (seconds: number) => {
		setTimeLeftInSeconds((oldTimeLeftInSeconds) => oldTimeLeftInSeconds - seconds);
	};

	useEffect(() => {
		let interval: NodeJS.Timeout;

		if (timerActive) {
			interval = setInterval(() => handleReduceTimeLeftBy(1), INTERVAL_PERIOD_IN_SECONDS);
		}

		return () => clearInterval(interval);
	}, [timerActive]);

	return {
		timerActive,
		timeLeftInSeconds,
		startTimer: handleStartTimer,
		stopTimer: handleStopTimer,
	};
};
