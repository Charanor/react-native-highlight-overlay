import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export type ListHeaderProps = {
	title: string;
	onHighlightPressed: () => void;
};

function ListHeader({ title, onHighlightPressed }: ListHeaderProps) {
	return (
		<View style={styles.header}>
			<Text style={styles.headerText}>{title}</Text>
			<Pressable style={styles.highlightButton} onPress={onHighlightPressed}>
				<Text style={styles.highlightButtonText}>Highlight random</Text>
			</Pressable>
		</View>
	);
}

const styles = StyleSheet.create({
	header: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		marginBottom: 30,
	},
	headerText: {
		fontSize: 24,
	},
	highlightButton: {
		backgroundColor: "white",
		padding: 5,
		borderRadius: 5,
	},
	highlightButtonText: {
		fontSize: 14,
	},
});

export default ListHeader;
