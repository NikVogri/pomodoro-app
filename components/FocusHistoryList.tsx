import { useMemo } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { FocusHistoryRecord } from "../models";

import FocusHistoryListItem from "./FocusHistoryListItem";

interface FocusHistoryListProps {
	focuses: FocusHistoryRecord[];
}

function FocusHistoryList({ focuses }: FocusHistoryListProps) {
	const orderedFocusesList = useMemo(
		() => focuses.sort((a, b) => b.startTimestamp - a.startTimestamp),
		[focuses.length]
	);

	return (
		<View style={styles.list}>
			<FlatList
				renderItem={({ item }) => <FocusHistoryListItem item={item} />}
				data={orderedFocusesList}
				keyExtractor={(focusItem) => focusItem.id}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	list: {
		height: "90%",
	},
});

export default FocusHistoryList;
