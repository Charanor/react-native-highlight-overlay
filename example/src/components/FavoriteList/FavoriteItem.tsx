import React from "react";
import type { ImageSourcePropType, StyleProp, ViewStyle } from "react-native";
import { StyleSheet, Image, Text, View } from "react-native";

export const ITEM_HEIGHT = 60;
const BORDER_RADIUS = 10;

export type FavoriteItemProps = {
	title: string;
	artist: string;
	duration: string;
	imageSource: ImageSourcePropType;
	style?: StyleProp<ViewStyle>;
};

function FavoriteItem({ title, artist, duration, imageSource, style }: FavoriteItemProps) {
	return (
		<View style={[styles.container, style]}>
			<Image source={imageSource} style={styles.image} />
			<View style={styles.textSection}>
				<Text style={styles.title}>{title}</Text>
				<View style={styles.bottomTextSection}>
					<Text style={styles.artist}>{artist}</Text>
					<Text style={styles.duration}>{duration}</Text>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		height: ITEM_HEIGHT,
		flexDirection: "row",
		backgroundColor: "#F0F0F0",
		borderRadius: BORDER_RADIUS,
	},
	image: {
		borderRadius: BORDER_RADIUS,
		width: ITEM_HEIGHT,
		height: ITEM_HEIGHT,
	},
	textSection: {
		flex: 1,
		flexDirection: "column",
		paddingVertical: 5,
		paddingHorizontal: 10,
		justifyContent: "space-evenly",
	},
	title: {
		fontWeight: "bold",
		fontSize: 22,
	},
	bottomTextSection: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	artist: {
		fontSize: 14,
		opacity: 0.6,
	},
	duration: {
		fontSize: 14,
		fontWeight: "bold",
	},
});

export default FavoriteItem;
