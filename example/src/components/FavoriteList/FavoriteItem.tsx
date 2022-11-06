import React from "react";
import {
	Alert,
	Image as RNImage,
	ImageSourcePropType,
	Pressable,
	StyleProp,
	StyleSheet,
	Text,
	View,
	ViewStyle,
} from "react-native";
import { styled } from "../../styled";

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
		<Container style={style} onPress={() => Alert.alert("You pressed", title)}>
			<Image source={imageSource} />
			<TextSection>
				<Title>{title}</Title>
				<BottomTextSection>
					<Artist>{artist}</Artist>
					<Duration>{duration}</Duration>
				</BottomTextSection>
			</TextSection>
		</Container>
	);
}

const Container = styled(Pressable, {
	height: ITEM_HEIGHT,
	flexDirection: "row",
	backgroundColor: "#F0F0F0",
	borderRadius: BORDER_RADIUS,
});

const Image = styled(RNImage, {
	borderRadius: BORDER_RADIUS,
	width: ITEM_HEIGHT,
	height: ITEM_HEIGHT,
});

const TextSection = styled(View, {
	flex: 1,
	flexDirection: "column",
	paddingVertical: 5,
	paddingHorizontal: 10,
	justifyContent: "space-evenly",
});

const Title = styled(Text, {
	fontWeight: "bold",
	fontSize: 22,
});

const BottomTextSection = styled(View, {
	flexDirection: "row",
	justifyContent: "space-between",
});

const Artist = styled(Text, {
	fontSize: 14,
	opacity: 0.6,
});

const Duration = styled(Text, {
	fontSize: 14,
	fontWeight: "bold",
});

export default FavoriteItem;
