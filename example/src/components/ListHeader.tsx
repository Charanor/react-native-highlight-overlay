import React from "react";
import { Pressable, Text, View } from "react-native";
import { styled } from "../styled";

export type ListHeaderProps = {
	title: string;
	onHighlightPressed: () => void;
};

function ListHeader({ title, onHighlightPressed }: ListHeaderProps) {
	return (
		<Header>
			<HeaderText>{title}</HeaderText>
			<HighlightButton onPress={onHighlightPressed}>
				<HighlightButtonText>Highlight random</HighlightButtonText>
			</HighlightButton>
		</Header>
	);
}

const Header = styled(View, {
	flexDirection: "row",
	alignItems: "center",
	justifyContent: "space-between",
	marginBottom: 30,
});

const HeaderText = styled(Text, {
	fontSize: 24,
});

const HighlightButton = styled(Pressable, {
	backgroundColor: "white",
	padding: 5,
	borderRadius: 5,
});

const HighlightButtonText = styled(Text, {
	fontSize: 14,
});

export default ListHeader;
