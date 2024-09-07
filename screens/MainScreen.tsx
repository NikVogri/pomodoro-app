import { Image, StyleSheet, Text, View } from "react-native";
import { ScreenProps } from "./models";
import { isDevEnv } from "../util/isDevEnv";

import Button from "../components/UI/Button";
import Layout from "../components/UI/Layout";

function MainScreen({ navigation }: ScreenProps<"Main">) {
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
			<View style={styles.container}>
				<Image source={require("../assets/pomodoro.png")} style={styles.logo} />
				<Text style={styles.title}>Pomodoro</Text>
				<Button onPress={startFocusHandler} type="flat">
					Focus Now
				</Button>
				<Button onPress={showPastFocusHandler} type="flat">
					History
				</Button>
				<Button onPress={showAboutHandler} type="flat">About</Button>
				{isDevEnv && (
					<Button onPress={showDebugHandler} type="flat">
						Debug
					</Button>
				)}
			</View>
		</Layout>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "column",
		alignItems: "center",
	},
	logo: {
		height: 84,
		resizeMode: "contain",
	},
	title: {
		fontSize: 56,
		fontWeight: "bold",
		textAlign: "center",
		marginBottom: 50,
		color: "#f2f2f2",
	},
});

export default MainScreen;
