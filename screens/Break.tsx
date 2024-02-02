import { StyleSheet, Text, View } from "react-native";
import { useCallback, useEffect, useState } from "react";
import { ScreenProps } from "./models";
import { useFinishedStepNotification } from "../hooks/useFinishedStepNotification";
import { focusHistory } from "../services/local-storage/FocusHistory";
import { ALLOWED_IDLE_TIME_IN_SECONDS } from "../constants";

import CountdownClock from "../components/CountdownClock";
import Layout from "../components/UI/Layout";
import Button from "../components/UI/Button";
import IdleCheck from "../components/IdleCheck";

function Break({ navigation, route }: ScreenProps<"Break">) {
	const [continueSessionAvailable, setContinueSessionAvailable] = useState<boolean>(false);
	const { breakTimeInSecs, repeat } = route.params;

	const { scheduleNotification } = useFinishedStepNotification("timeToFocus");

	useEffect(() => {
		// Remind user that the timer is nearing 0
		scheduleNotification(breakTimeInSecs - 20);
	}, []);

	const handleContinueSession = () => {
		const params = { ...route.params, repeat: repeat - 1 };
		navigation.replace("Focus", params);
	};

	const handleCountdownFinish = useCallback(
		async (overboardTimeInSecs: number) => {
			// Only applicable if app lost focus during session
			// Overboard is calculated using lost focus timestamp and current timestamp
			if (overboardTimeInSecs > ALLOWED_IDLE_TIME_IN_SECONDS) {
				await handleAutoCancelSession();
				return;
			}

			if (!continueSessionAvailable) {
				setContinueSessionAvailable(true);
			}
		},
		[continueSessionAvailable, setContinueSessionAvailable]
	);

	const handleAutoCancelSession = async () => {
		await focusHistory.markCancelled(route.params.id);
		const params = { reason: "You were idle for too long" };
		navigation.replace("CancelledSession", params);
	};

	return (
		<Layout backgroundColor="#27ae60">
			<View>
				<Text style={styles.title}>Break</Text>
				<Text style={styles.infoText}>Intervals left: {repeat}</Text>
				<CountdownClock time={breakTimeInSecs} onCountdownFinish={handleCountdownFinish} />
				{continueSessionAvailable ? (
					<IdleCheck text="Focus" onPress={handleContinueSession} onTimerFinish={handleAutoCancelSession} />
				) : (
					<Button onPress={handleContinueSession} type="flat">
						Skip break
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
});

export default Break;
