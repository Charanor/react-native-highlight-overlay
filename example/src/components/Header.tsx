import React from "react";
import { Platform, StatusBar, Text, View } from "react-native";
import { FadeDuringHighlight } from "react-native-highlight-overlay";
import { styled } from "../styled";

function Header() {
	return (
		<Container>
			<CountContainer>
				<CountSmall>25</CountSmall>
				<CountLarge>/30</CountLarge>
			</CountContainer>
			<Title>Radio 160</Title>
			<FavoritesText>115k+ favourites</FavoritesText>
		</Container>
	);
}

const Container = styled(FadeDuringHighlight, {
	backgroundColor: "#0A091C",
	elevation: 5,
	paddingHorizontal: 25,
	paddingTop: Math.max(Platform.select({ android: StatusBar.currentHeight }), 50),
	paddingBottom: 50,
});

const CountContainer = styled(View, {
	flexDirection: "row",
	alignItems: "flex-end",
	marginBottom: 10,
});

const CountSmall = styled(Text, {
	color: "#FAFAFA",
	fontSize: 14,
});

const CountLarge = styled(Text, {
	color: "#FAFAFA",
	fontSize: 18,
});

const Title = styled(Text, {
	color: "#FAFAFA",
	fontSize: 36,
});

const FavoritesText = styled(Text, {
	color: "#FAFAFA",
	fontSize: 12,
	opacity: 0.8,
});

export default Header;
