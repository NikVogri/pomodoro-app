import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useCountdownTimer } from "../hooks/useCountdownTimer";
import { secondsHHMMSS } from "../util/secondsHHMMSS";

interface CountdownClockProps {
	time: number;
	onCountdownFinish: (overboardTimeInSecs: number) => void;
}

function CountdownClock({ time, onCountdownFinish }: CountdownClockProps) {
	const { timeLeftInSeconds, startTimer, stopTimer, timerActive } = useCountdownTimer(time);

	useEffect(() => {
		startTimer();
	}, []);

	useEffect(() => {
		if (!timerActive) return;

		if (timeLeftInSeconds < 0) {
			onCountdownFinish(Math.abs(timeLeftInSeconds));
			stopTimer();
		}
	}, [timeLeftInSeconds]);

	return (
		<View style={styles.container}>
			<Text style={styles.time}>{secondsHHMMSS(timeLeftInSeconds)}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		marginBottom: 30,
	},
	time: {
		fontSize: 65,
		fontWeight: "bold",
		textAlign: "center",
		color: "#f2f2f2",
	},
});

export default CountdownClock;
