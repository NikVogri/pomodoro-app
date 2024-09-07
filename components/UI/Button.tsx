import { Animated, Easing, StyleSheet, Text, TextStyle, TouchableWithoutFeedback } from "react-native";

interface ButtonProps {
	onPress: () => void;
	children: string;
	type?: "flat" | "underline";
	textStyle?: TextStyle;
}

function Button({ onPress, children, type, textStyle }: ButtonProps) {
	const animatedValue = new Animated.Value(0);

	const buttonScale = animatedValue.interpolate({
		inputRange: [0, 0.3],
		outputRange: [1, 1.01],
	});

	const onPressIn = () => {
		Animated.timing(animatedValue, {
			toValue: 1,
			duration: 125,
			easing: Easing.linear,
			useNativeDriver: true,
		}).start();
	};

	const onPressOut = () => {
		Animated.timing(animatedValue, {
			toValue: 0,
			duration: 50,
			easing: Easing.linear,
			useNativeDriver: true,
		}).start();
	};

	const animatedScaleStyle = {
		transform: [{ scale: buttonScale }],
	};

	return (
		<TouchableWithoutFeedback onPressIn={onPressIn} onPressOut={onPressOut} onPress={onPress}>
			<Animated.View style={[styles.button, animatedScaleStyle, type === "flat" && styles.buttonFlat]}>
				<Text
					style={[
						styles.text,
						type === "flat" && styles.buttonTextFlat,
						type === "underline" && styles.buttonTextUnderline,
						textStyle,
					]}
				>
					{children}
				</Text>
			</Animated.View>
		</TouchableWithoutFeedback>
	);
}

const styles = StyleSheet.create({
	button: {
		width: "100%",
		marginBottom: 10,
		borderRadius: 5,
	},
	buttonFlat: {
		borderWidth: 0,
		backgroundColor: "rgba(30, 30, 30, 0.1)",
	},
	text: {
		fontSize: 20,
		textAlign: "center",
		paddingVertical: 15,
		color: "#f2f2f2",
		fontWeight: "500",
	},
	buttonTextFlat: {
		fontWeight: "500",
	},
	buttonTextUnderline: {
		textDecorationLine: "underline",
	},
});

export default Button;
