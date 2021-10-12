import React from "react";
import { Platform, StatusBar, StyleSheet, Text, View } from "react-native";

export type HeaderProps = {};

function Header({}: HeaderProps) {
	return (
		<View style={styles.container}>
			<View style={styles.countContainer}>
				<Text style={styles.countSmall}>25</Text>
				<Text style={styles.countLarge}>/30</Text>
			</View>
			<Text style={styles.title}>Radio 160</Text>
			<Text style={styles.favorites}>115k+ favourites</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#0A091C",
		elevation: 5,
		paddingHorizontal: 25,
		paddingTop: Math.max(Platform.select({ android: StatusBar.currentHeight }), 50),
		paddingBottom: 50,
	},
	countContainer: {
		flexDirection: "row",
		alignItems: "flex-end",
		marginBottom: 10,
	},
	countSmall: {
		color: "#FAFAFA",
		fontSize: 14,
	},
	countLarge: {
		color: "#FAFAFA",
		fontSize: 18,
	},
	title: {
		color: "#FAFAFA",
		fontSize: 36,
	},
	favorites: {
		color: "#FAFAFA",
		fontSize: 12,
		opacity: 0.8,
	},
});

export default Header;
