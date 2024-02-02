import { useCallback, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ScreenProps } from "./models";
import { useFinishedStepNotification } from "../hooks/useFinishedStepNotification";
import { focusHistory } from "../services/local-storage/FocusHistory";
import { ALLOWED_IDLE_TIME_IN_SECONDS } from "../constants";

import Layout from "../components/UI/Layout";
import Button from "../components/UI/Button";
import CountdownClock from "../components/CountdownClock";
import IdleCheck from "../components/IdleCheck";

function Focus({ navigation, route }: ScreenProps<"Focus">) {
	const [breakAvailable, setBreakAvailable] = useState<boolean>(false);
	const { focusTimeInSecs, repeat } = route.params;
	const { sendNotification } = useFinishedStepNotification("timeToTakeABreak");

	const handleTimerFinish = useCallback(
		async (overboardTimeInSecs: number) => {
			// Only applicable if app lost focus during session
			// Overboard is calculated using lost focus timestamp and current timestamp
			if (overboardTimeInSecs > ALLOWED_IDLE_TIME_IN_SECONDS) {
				await handleAutoCancelSession();
				return;
			}

			if (repeat === 0) {
				focusHistory.markCompleted(route.params.id);
				navigation.replace("Completed");
			} else if (!breakAvailable) {
				setBreakAvailable(true);
				await sendNotification();
			}
		},
		[repeat, breakAvailable, setBreakAvailable, sendNotification]
	);

	const handleCancelSession = async () => {
		await focusHistory.markCancelled(route.params.id);
		const params = { reason: "You cancelled the session" };
		navigation.replace("CancelledSession", params);
	};

	const handleAutoCancelSession = async () => {
		await focusHistory.markCancelled(route.params.id);
		const params = { reason: "You were idle for too long" };
		navigation.replace("CancelledSession", params);
	};

	const handleTakeABreak = () => {
		navigation.replace("Break", route.params);
	};

	return (
		<Layout backgroundColor="#eb5757">
			<View>
				<Text style={styles.title}>Focus</Text>
				<Text style={styles.infoText}>Intervals left: {repeat}</Text>
				<CountdownClock onCountdownFinish={handleTimerFinish} time={focusTimeInSecs} />
				{breakAvailable ? (
					<IdleCheck text="Take a break" onPress={handleTakeABreak} onTimerFinish={handleAutoCancelSession} />
				) : (
					<Button onPress={handleCancelSession} type="flat">
						Quit
					</Button>
				)}
			</View>
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
