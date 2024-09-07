import { StyleSheet, Text, View } from "react-native";
import { ScreenProps } from "./models";

import Layout from "../components/UI/Layout";
import Button from "../components/UI/Button";

function Completed({ navigation }: ScreenProps<"Completed">) {
	const handleContinue = () => {
		navigation.popToTop();
	};

	const handleShowFocusHistory = () => {
		navigation.navigate("FocusHistory");
	};

	return (
		<Layout backgroundColor="#2d9cdb">
			<View>
				<Text style={{fontSize: 48, textAlign: "center", marginBottom: 10}}>🎉</Text>
				<Text style={styles.congratsText}>Congrats!</Text>
				<Text style={styles.infoText}>You&apos;ve completed your session!</Text>
				<Button onPress={handleContinue} type="flat">
					Continue
				</Button>
				<Button onPress={handleShowFocusHistory}>View History</Button>
			</View>
		</Layout>
	);
}

const styles = StyleSheet.create({
	congratsText: {
		fontSize: 36,
		textAlign: "center",
		fontWeight: "bold",
		marginBottom: 10,
		color: "#f2f2f2",
	},
	infoText: {
		fontSize: 22,
		textAlign: "center",
		marginBottom: 30,
		color: "#f2f2f2",
	},
});

export default Completed;
