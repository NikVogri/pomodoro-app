import { StyleSheet, Text, View } from "react-native";

import IdleTimer from "./IdleClock";
import Button from "./UI/Button";

interface IdleCheckProps {
	onPress: () => void;
	onTimerFinish: () => void;
	text: string;
}

function IdleCheck({ onPress, onTimerFinish, text }: IdleCheckProps) {
	return (
		<View style={styles.container}>
			<IdleTimer onTimerFinish={onTimerFinish} />
			<Text style={styles.text}>Click the button before the timer runs out to continue with the session!</Text>
			<Button onPress={onPress} type="flat">{text}</Button>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		marginVertical: 30,
		backgroundColor: "rgba(242,242,242,0.15)",
		borderRadius: 15,
		padding: 20,
	},
	text: {
		fontSize: 16,
		fontWeight: "500",
		textAlign: "center",
		marginVertical: 20,
		color: "#f2f2f2",
	},
});

export default IdleCheck;
