import { Animated, Easing, StyleSheet, Text } from "react-native";
import { ScreenProps } from "./models";
import { isDevEnv } from "../util/isDevEnv";

import Button from "../components/UI/Button";
import Layout from "../components/UI/Layout";
import { useEffect, useRef } from "react";

function MainScreen({ navigation }: ScreenProps<"Main">) {
	const translateY = useRef(new Animated.Value(0)).current;

	useEffect(() => {
		const animate = () => {
			Animated.loop(
				Animated.sequence([
					Animated.timing(translateY, {
						toValue: 5,
						duration: 1500,
						easing: Easing.inOut(Easing.ease),
						useNativeDriver: true,
					}),
					Animated.timing(translateY, {
						toValue: 0,
						duration: 1500,
						easing: Easing.inOut(Easing.ease),
						useNativeDriver: true,
					}),
				]),
				{ iterations: -1 }
			).start();
		};

		animate();
	}, [translateY]);

	const startFocusHandler = () => {
		navigation.navigate("FocusSettings");
	};

	const showPastFocusHandler = () => {
		navigation.navigate("FocusHistory");
	};

	const showDebugHandler = () => {
		navigation.navigate("Debug");
	};

	const showAboutHandler = () => {
		navigation.navigate("About");
	};

	return (
		<Layout backgroundColor="#EB5757">
			<Animated.Image
				source={require("../assets/pomodoro.png")}
				style={[styles.logo, { transform: [{ translateY }] }]}
			/>
			<Text style={styles.title}>Pomodoro</Text>
			<Button onPress={startFocusHandler} type="flat">
				Focus Now
			</Button>
			<Button onPress={showPastFocusHandler} type="flat">
				History
			</Button>
			<Button onPress={showAboutHandler} type="flat">
				About
			</Button>
			{isDevEnv && (
				<Button onPress={showDebugHandler} type="flat">
					Debug
				</Button>
			)}
		</Layout>
	);
}

const styles = StyleSheet.create({
	logo: {
		height: 84,
		resizeMode: "contain",
		alignSelf: "center",
		marginBottom: 10,
	},
	title: {
		fontSize: 42,
		fontWeight: "bold",
		textAlign: "center",
		marginBottom: 50,
		color: "#f2f2f2",
	},
});

export default MainScreen;
