import { useCallback, useEffect, useState } from "react";
import { Alert, StyleSheet, Text } from "react-native";
import { ScreenProps } from "./models";
import { useFinishedStepNotification } from "../hooks/useFinishedStepNotification";
import { focusHistory } from "../services/local-storage/FocusHistory";
import { ALLOWED_IDLE_TIME_IN_SECONDS } from "../constants";
import { usePlaySound } from "../hooks/usePlaySound";

import Layout from "../components/UI/Layout";
import Button from "../components/UI/Button";
import CountdownClock from "../components/CountdownClock";
import IdleCheck from "../components/IdleCheck";
import AnimatedEmoji from "../components/UI/AnimatedEmoji";

function Focus({ navigation, route }: ScreenProps<"Focus">) {
	const [breakAvailable, setBreakAvailable] = useState<boolean>(false);
	const { focusTimeInSecs, repeat } = route.params;
	const { scheduleNotification } = useFinishedStepNotification("timeToTakeABreak");
	const { playSound: playChime } = usePlaySound(require("../assets/chime.mp3"), { volume: 0.25 });

	useEffect(() => {
		// Remind user that the timer is nearing 0
		scheduleNotification(focusTimeInSecs - 20);
	}, []);

	const handleTimerFinish = useCallback(
		async (overboardTimeInSecs: number) => {
			// Only applicable if app lost focus during session
			// Overboard is calculated using lost focus timestamp and current timestamp
			if (overboardTimeInSecs > ALLOWED_IDLE_TIME_IN_SECONDS) {
				await handleAutoCancelSession();
				return;
			}

			console.log(overboardTimeInSecs);
			if (overboardTimeInSecs < 5) {
				console.log("playing chime");
				await playChime();
			}

			if (repeat === 0) {
				focusHistory.markCompleted(route.params.id);
				navigation.replace("Completed");
			} else if (!breakAvailable) {
				setBreakAvailable(true);
			}
		},
		[repeat, breakAvailable, setBreakAvailable]
	);

	const handleCancelSession = async () => {
		await focusHistory.markCancelled(route.params.id);
		const params = { reason: "You cancelled the session" };
		navigation.replace("CancelledSession", params);
	};

	const handleAutoCancelSession = async () => {
		await focusHistory.markCancelled(route.params.id);
		const params = { reason: "You were idle for too long." };
		navigation.replace("CancelledSession", params);
	};

	const handleTakeABreak = () => {
		navigation.replace("Break", route.params);
	};

	const handlePromptCancelSession = () => {
		Alert.alert("Quit?", "Are you sure you want to cancel the current session?", [
			{
				text: "Cancel",
			},
			{ text: "Yes", onPress: handleCancelSession },
		]);
	};

	return (
		<Layout backgroundColor="#eb5757">
			<AnimatedEmoji source={require("../assets/gifs/emoji-thinking.gif")} />
			<Text style={styles.title}>Focus</Text>
			<Text style={styles.infoText}>Intervals left: {repeat}</Text>
			<CountdownClock onCountdownFinish={handleTimerFinish} time={focusTimeInSecs} />
			{breakAvailable ? (
				<IdleCheck text="Take a break" onPress={handleTakeABreak} onTimerFinish={handleAutoCancelSession} />
			) : (
				<Button onPress={handlePromptCancelSession} type="underline">
					Quit
				</Button>
			)}
		</Layout>
	);
}

const styles = StyleSheet.create({
	title: {
		fontSize: 42,
		textAlign: "center",
		marginBottom: 50,
		fontWeight: "bold",
		color: "#f2f2f2",
	},
	infoText: {
		fontSize: 18,
		fontWeight: "500",
		textAlign: "center",
		color: "#f2f2f2",
	},
	breakControllsContainer: {
		marginTop: 20,
	},
});

export default Focus;
