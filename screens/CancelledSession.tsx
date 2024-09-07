import { StyleSheet, Text, View } from "react-native";
import { ScreenProps } from "./models";

import Layout from "../components/UI/Layout";
import Button from "../components/UI/Button";

function CancelledSession({ navigation, route }: ScreenProps<"CancelledSession">) {
	const { reason } = route.params;

	const handleContinue = () => {
		navigation.popToTop();
	};

	return (
		<Layout backgroundColor="#bb6bd9">
			<View>
				<Text style={styles.title}>Session Cancelled {":("}</Text>
				<Text style={styles.reason}>{reason}</Text>
				<Button onPress={handleContinue} type="flat">
					Continue
				</Button>
			</View>
		</Layout>
	);
}

const styles = StyleSheet.create({
	title: {
		fontSize: 36,
		fontWeight: "bold",
		textAlign: "center",
		marginBottom: 20,
		color: "#f2f2f2",
	},
	reason: {
		textAlign: "center",
		fontSize: 22,
		marginBottom: 50,
		color: "#f2f2f2",
	},
});

export default CancelledSession;
