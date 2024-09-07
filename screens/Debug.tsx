import { isDevEnv } from "../util/isDevEnv";
import { ScreenProps } from "./models";
import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { localStorage } from "../services/local-storage/LocalStorage";

import Layout from "../components/UI/Layout";
import Button from "../components/UI/Button";

function Debug({ navigation }: ScreenProps<"Debug">) {
	useEffect(() => {
		if (!isDevEnv) navigation.replace("Main");
	}, [navigation]);

	const clearCacheHandler = () => {
		localStorage.clearAppLocalStorage();
	};

	return (
		<Layout backgroundColor="#000" showBackButton>
			<View style={styles.container}>
				<Text style={styles.disclaimer}>This screen should only be visible in development environment</Text>
				<View>
					<Button onPress={clearCacheHandler}>Clear cache</Button>
				</View>
			</View>
		</Layout>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	disclaimer: {
		textAlign: "center",
		fontSize: 18,
		color: "red",
		fontWeight: "bold",
		marginBottom: 50,
	},
});

export default Debug;
