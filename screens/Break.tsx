import { StyleSheet, Text, View } from "react-native";
import { useCallback, useState } from "react";
import { ScreenProps } from "./models";
import { useFinishedStepNotification } from "../hooks/useFinishedStepNotification";
import { focusHistory } from "../services/local-storage/FocusHistory";

import CountdownClock from "../components/CountdownClock";
import Layout from "../components/UI/Layout";
import Button from "../components/UI/Button";
import IdleCheck from "../components/IdleCheck";

function Break({ navigation, route }: ScreenProps<"Break">) {
	const [continueSessionAvailable, setContinueSessionAvailable] = useState<boolean>(false);
	const { breakTimeInSecs, repeat } = route.params;

	const { sendNotification } = useFinishedStepNotification("timeToFocus");

	const handleContinueSession = () => {
		const params = { ...route.params, repeat: repeat - 1 };
		navigation.replace("Focus", params);
	};

	const handleCountdownFinish = useCallback(async () => {
		if (!continueSessionAvailable) {
			setContinueSessionAvailable(true);
			await sendNotification();
		}
	}, [continueSessionAvailable, setContinueSessionAvailable, sendNotification]);

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
