import React from "react";
import type { ImageSourcePropType, StyleProp, ViewStyle } from "react-native";
import { Image, StyleSheet, Text, View } from "react-native";

export const ICON_SIZE = {
	width: 100,
	height: 140,
};

const BORDER_RADUIS = 15;

export type SimilarItemProps = {
	title: string;
	imageSource: ImageSourcePropType;
	style?: StyleProp<ViewStyle>;
};

function SimilarItem({ title, imageSource, style }: SimilarItemProps) {
	return (
		<View style={[styles.container, style]}>
			<Image source={imageSource} style={styles.image} />
			<Text style={styles.title}>{title}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		backgroundColor: "#F0F0F0",
		borderRadius: BORDER_RADUIS,
	},
	image: {
		...ICON_SIZE,
		borderRadius: BORDER_RADUIS,
		marginBottom: 10,
	},
	title: {
		fontSize: 14,
	},
});

export default SimilarItem;
