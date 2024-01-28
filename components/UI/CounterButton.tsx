import { StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";

interface ButtonProps {
	onPress: () => void;
	children: string;
	disabled: boolean;
}

function CounterButton({ onPress, children, disabled }: ButtonProps) {
	return (
		<TouchableWithoutFeedback onPress={onPress} disabled={disabled}>
			<View style={[styles.button, disabled && styles.disabled]}>
				<Text style={styles.text}>{children}</Text>
			</View>
		</TouchableWithoutFeedback>
	);
}

const styles = StyleSheet.create({
	button: {
		borderColor: "rgba(242,242,242,0.75)",
		borderWidth: 2,
		borderRadius: 5,
		width: 35,
		height: 35,
		alignContent: "center",
		justifyContent: "center",
		margin: 5,
	},
	disabled: {
		opacity: 0.5,
	},
	text: {
		fontSize: 25,
		textAlign: "center",
		color: "#f2f2f2",
	},
});

export default CounterButton;
