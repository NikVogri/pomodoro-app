import { Image, StyleSheet, View } from "react-native";

function SplashScreen() {
	return (
		<View style={styles.container}>
			<Image source={require("../assets/icon.png")} style={styles.logo} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#EB5757",
	},
	logo: {
		height: 84,
		resizeMode: "contain",
	},
});

export default SplashScreen;
