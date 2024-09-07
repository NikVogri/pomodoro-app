import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ScreenProps } from "./models";

import { FocusHistoryRecord } from "../models";
import { focusHistory } from "../services/local-storage/FocusHistory";

import Layout from "../components/UI/Layout";
import FocusHistoryList from "../components/FocusHistoryList";
import Button from "../components/UI/Button";

function FocusHistory({ navigation }: ScreenProps<"FocusHistory">) {
	const [pastFocuses, setPastFocuses] = useState<FocusHistoryRecord[]>([]);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			const focuses = await focusHistory.getAllRecords();
			setPastFocuses(focuses);
			setLoading(false);
		};
		fetchData();
	}, [setPastFocuses]);

	const startSessionHandler = () => {
		navigation.navigate("FocusSettings");
	};

	let content;
	if (loading) {
		content = <Text>Loading...</Text>;
	} else if (pastFocuses.length === 0) {
		content = (
			<View style={styles.noItemsContainer}>
				<Text style={styles.noItemsText}>
					You haven't started a session yet. Once you do, it will show up here!
				</Text>
				<Button onPress={startSessionHandler} type="flat">
					Start now
				</Button>
			</View>
		);
	} else {
		content = (
			<>
				<Text style={styles.title}>Past focuses</Text>
				<FocusHistoryList focuses={pastFocuses} />
			</>
		);
	}

	return (
		<Layout backgroundColor="#2F80ED" showBackButton>
			<View style={styles.container}>{content}</View>
		</Layout>
	);
}

const styles = StyleSheet.create({
	container: {
		paddingVertical: 15,
		flex: 1,
	},
	title: {
		fontSize: 24,
		textAlign: "center",
		fontWeight: "bold",
		marginBottom: 15,
		color: "#f2f2f2",
	},
	noItemsContainer: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	noItemsText: {
		fontSize: 18,
		textAlign: "center",
		fontWeight: "normal",
		marginBottom: 25,
		color: "#f2f2f2",
	},
});

export default FocusHistory;
