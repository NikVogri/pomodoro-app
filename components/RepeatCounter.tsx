import { StyleSheet, Text, View } from "react-native";
import { MAX_REPEAT_COUNT, MIN_REPEAT_COUNT } from "../constants";

import CounterButton from "./UI/CounterButton";

interface RepeatCounterProps {
	value: number;
	onCountChange: (type: "inc" | "dec") => void;
}

function RepeatCounter({ value, onCountChange }: RepeatCounterProps) {
	return (
		<View style={styles.container}>
			<Text style={styles.subtitle}>Intervals:</Text>
			<View style={styles.innerContainer}>
				<Text style={styles.value}>{value}</Text>
				<View style={styles.btnContainer}>
					<CounterButton onPress={() => onCountChange("dec")} disabled={value === MIN_REPEAT_COUNT}>
						-
					</CounterButton>
					<CounterButton onPress={() => onCountChange("inc")} disabled={value === MAX_REPEAT_COUNT}>
						+
					</CounterButton>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 30,
	},
	innerContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "flex-end",
	},
	btnContainer: {
		flexDirection: "row",
	},
	value: {
		fontSize: 23,
		marginRight: 10,
		fontWeight: "800",
		color: "#f2f2f2",
	},
	subtitle: {
		fontSize: 18,
		textAlign: "left",
		marginLeft: 15,
		color: "#f2f2f2",
		fontWeight: "500",
	},
});

export default RepeatCounter;
