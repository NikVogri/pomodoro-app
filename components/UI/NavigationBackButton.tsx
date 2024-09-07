import { StyleSheet } from "react-native";
import Button from "./Button";
import { useNavigation } from "@react-navigation/native";

interface ButtonProps {}

function NavigationBackButton({}: ButtonProps) {
	const navigation = useNavigation();

	if (!navigation.canGoBack()) return null;

	return (
		<Button onPress={() => navigation.goBack()} textStyle={{ textAlign: "left", fontWeight: "bold", fontSize: 24 }}>
			{"<"}
		</Button>
	);
}

const styles = StyleSheet.create({});

export default NavigationBackButton;
