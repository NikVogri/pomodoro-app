import { StyleSheet, Text, View } from "react-native";
import { FocusHistoryRecord } from "../models";
import { secondsHHMMSS } from "../util/secondsHHMMSS";
import { timestampToHumanReadableDate } from "../util/timestampToHumanReadableDate";

function FocusHistoryListItem({ item }: { item: FocusHistoryRecord }) {
	const totalFocusTimeInSeconds = item.config.focusTimeInSecs * (item.config.repeat || 1);

	// Remember that in Dev environment countdowns are at 1/10 of a second.
	// Don't be confused if this value might seems off while testing.
	let totalSessionTimeInSeconds = 0;
	if (item.endTimestamp) {
		const totalSessionTimeInMs = item.endTimestamp - item.startTimestamp;
		totalSessionTimeInSeconds = totalSessionTimeInMs / 1000;
	}

	return (
		<View style={styles.item}>
			<Text style={styles.sessionDateText}>
				{timestampToHumanReadableDate(item.startTimestamp)} {item.cancelled && "(Cancelled)"}
			</Text>
			<Text style={styles.sessionStatText}>
				Session Time:{" "}
				<Text style={styles.textHighlight}>
					{totalSessionTimeInSeconds === 0 ? "N/A" : secondsHHMMSS(totalSessionTimeInSeconds)}
				</Text>
			</Text>

			<Text style={[styles.sessionStatText, styles.textHighlight]}>
				Focus time:{" "}
				{item.completed ? (
					<Text style={styles.textHighlight}>{secondsHHMMSS(totalFocusTimeInSeconds)}</Text>
				) : (
					"N/A"
				)}
			</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	item: {
		padding: 15,
		marginBottom: 10,
		backgroundColor: "rgba(242,242,242,0.15)",
		borderRadius: 15,
	},
	sessionDateText: {
		fontSize: 15,
		textAlign: "left",
		fontWeight: "bold",
		marginBottom: 15,
		color: "#f2f2f2",
	},
	sessionStatText: {
		fontSize: 15,
		flex: 1,
		color: "#f2f2f2",
	},
	textHighlight: {
		fontWeight: "bold",
	},
	timesContainer: {
		flex: 1,
	},
	createdAtText: {
		flex: 7,
	},
});

export default FocusHistoryListItem;
