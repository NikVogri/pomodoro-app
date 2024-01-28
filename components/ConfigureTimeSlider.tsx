import Slider from "@react-native-community/slider";
import { StyleSheet, Text, View } from "react-native";
import { minutesHHMMSS } from "../util/minutesHHMMSS";

interface ConfigureTimeSliderProps {
	title: string;
	min: number;
	max: number;
	value: number;
	step?: number;
	onValueChange: (value: number) => void;
}

function ConfigureTimeSlider({ title, min, max, value, step, onValueChange }: ConfigureTimeSliderProps) {
	return (
		<View style={styles.container}>
			<View style={styles.infoContainer}>
				<Text style={styles.title}>{title}</Text>
				<Text style={styles.value}>{minutesHHMMSS(value)}</Text>
			</View>
			<Slider
				minimumValue={min}
				maximumValue={max}
				value={value}
				onValueChange={onValueChange}
				step={step ?? 1}
				maximumTrackTintColor="rgba(0,0,0, 0.3)"
				minimumTrackTintColor="rgba(255,255,255, 0.3)"
				thumbTintColor="rgba(255,255,255, 0.75)"
				style={styles.slider}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		marginBottom: 25,
	},
	infoContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	title: {
		fontSize: 18,
		textAlign: "left",
		marginLeft: 15,
		color: "#f2f2f2",
		fontWeight: "500",
	},
	value: {
		fontSize: 22,
		textAlign: "left",
		fontWeight: "800",
		marginBottom: 5,
		color: "#fff",
	},
	slider: {
		padding: 5,
	},
});

export default ConfigureTimeSlider;
