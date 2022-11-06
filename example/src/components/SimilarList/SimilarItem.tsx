import React from "react";
import type { ImageSourcePropType, StyleProp, ViewStyle } from "react-native";
import { Image as RNImage, Text, View } from "react-native";
import { styled } from "../../styled";

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
		<Container style={style}>
			<Image source={imageSource} />
			<Title>{title}</Title>
		</Container>
	);
}

const Container = styled(View, {
	alignItems: "center",
	backgroundColor: "#F0F0F0",
	borderRadius: BORDER_RADUIS,
});

const Image = styled(RNImage, {
	...ICON_SIZE,
	borderRadius: BORDER_RADUIS,
	marginBottom: 10,
});

const Title = styled(Text, {
	fontSize: 14,
});

export default SimilarItem;
