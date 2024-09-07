import { ScreenProps } from "./models";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import {
	DEFAULT_BREAK_LENGTH_IN_MINUTES,
	DEFAULT_FOCUS_LENGTH_IN_MINUTES,
	DEFAULT_REPEAT_COUNT,
	MAX_BREAK_LENGHT_IN_MINUTES,
	MAX_FOCUS_LENGHT_IN_MINUTES,
	MAX_REPEAT_COUNT,
	MIN_BREAK_LENGHT_IN_MINUTES,
	MIN_FOCUS_LENGHT_IN_MINUTES,
	MIN_REPEAT_COUNT,
} from "../constants";
import { focusHistory } from "../services/local-storage/FocusHistory";
import { FocusConfig } from "../models";

import ConfigureTimeSlider from "../components/ConfigureTimeSlider";
import RepeatCounter from "../components/RepeatCounter";
import Button from "../components/UI/Button";
import Layout from "../components/UI/Layout";

function FocusSettings({ navigation }: ScreenProps<"FocusSettings">) {
	const [focusLengthInMinutes, setFocusLengthInMinutes] = useState<number>(DEFAULT_FOCUS_LENGTH_IN_MINUTES);
	const [breakLengthInMinutes, setBreakLengthInMinutes] = useState<number>(DEFAULT_BREAK_LENGTH_IN_MINUTES);
	const [repeatCount, setRepeatCount] = useState<number>(DEFAULT_REPEAT_COUNT);

	const handleFocusLengthChange = (value: number) => {
		setFocusLengthInMinutes(value);
	};

	const handleFocusBreakChange = (value: number) => {
		setBreakLengthInMinutes(value);
	};

	const handleCountChange = (type: "inc" | "dec") => {
		setRepeatCount((oldRepeatCount) => {
			const newRepeatCount = type === "inc" ? oldRepeatCount + 1 : oldRepeatCount - 1;

			if (newRepeatCount < MIN_REPEAT_COUNT || newRepeatCount > MAX_REPEAT_COUNT) return oldRepeatCount;
			else return newRepeatCount;
		});
	};

	const handleStartSession = async () => {
		const focusConfig: FocusConfig = {
			focusTimeInSecs: focusLengthInMinutes * 60,
			breakTimeInSecs: breakLengthInMinutes * 60,
			repeat: repeatCount,
		};

		const record = await focusHistory.createRecord(focusConfig);
		navigation.navigate("Focus", { id: record.id, ...focusConfig });
	};

	const handleCancelSession = () => {
		navigation.goBack();
	};

	return (
		<Layout backgroundColor="#9B51E0">
			<View style={{ backgroundColor: "rgba(79,79,79,0.1	)", padding: 10 }}>
				<Text style={styles.title}>Configure Session</Text>
				<ConfigureTimeSlider
					title="Focus Length"
					max={MAX_FOCUS_LENGHT_IN_MINUTES}
					min={MIN_FOCUS_LENGHT_IN_MINUTES}
					value={focusLengthInMinutes}
					onValueChange={handleFocusLengthChange}
					step={1}
				/>
				<ConfigureTimeSlider
					title="Break Length"
					max={MAX_BREAK_LENGHT_IN_MINUTES}
					min={MIN_BREAK_LENGHT_IN_MINUTES}
					value={breakLengthInMinutes}
					onValueChange={handleFocusBreakChange}
					step={1}
				/>

				<RepeatCounter value={repeatCount} onCountChange={handleCountChange} />
				<Button onPress={handleStartSession} type="flat">Start</Button>
				<Button onPress={handleCancelSession}>
					Cancel
				</Button>
			</View>
		</Layout>
	);
}

const styles = StyleSheet.create({
	title: {
		fontSize: 32,
		textAlign: "center",
		fontWeight: "bold",
		marginBottom: 55,
		color: "#f2f2f2",
	},
});

export default FocusSettings;
