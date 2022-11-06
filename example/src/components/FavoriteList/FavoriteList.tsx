import React, { Fragment } from "react";
import { View } from "react-native";
import { HighlightableElement } from "react-native-highlight-overlay";

import ListHeader from "../ListHeader";
import { getRandomImage } from "../../util";

import FavoriteItem, { ITEM_HEIGHT } from "./FavoriteItem";
import { styled } from "../../styled";

const FAVORITES_LIST = [
	{
		title: "Let me love you",
		artist: "Dj Snake ft J8",
		duration: "4:38",
		imageSource: { uri: getRandomImage(ITEM_HEIGHT, 1) },
	},
	{
		title: "Believer",
		artist: "Major Lazer, Showtek",
		duration: "3:43",
		imageSource: { uri: getRandomImage(ITEM_HEIGHT, 2) },
	},
	{
		title: "Don't let me down",
		artist: "The Chainsmokers",
		duration: "3:18",
		imageSource: { uri: getRandomImage(ITEM_HEIGHT, 3) },
	},
	{
		title: "Last night",
		artist: "The dude that never quits",
		duration: "2:11",
		imageSource: { uri: getRandomImage(ITEM_HEIGHT, 4) },
	},
];

const getUniqueKeyForItem = (item: typeof FAVORITES_LIST[number]) =>
	`${item.title}+${item.artist}+${item.duration}`;

export type FavoriteListProps = {
	setHighlightId: (id: string | null) => void;
};

function FavoriteList({ setHighlightId }: FavoriteListProps) {
	return (
		<Container>
			<ListHeader
				title={`My favourites (${FAVORITES_LIST.length})`}
				onHighlightPressed={() => {
					const randomIdx = Math.round(Math.random() * (FAVORITES_LIST.length - 1));
					const item = FAVORITES_LIST[randomIdx];
					setHighlightId(getUniqueKeyForItem(item));
				}}
			/>
			<ListContainer>
				{FAVORITES_LIST.map((favItem) => (
					<Fragment key={getUniqueKeyForItem(favItem)}>
						<HighlightableElement
							id={getUniqueKeyForItem(favItem)}
							options={{
								mode: "rectangle",
								clickthroughHighlight: false,
								padding: 5,
								borderRadius: 10,
							}}
						>
							<FavoriteItem {...favItem} />
						</HighlightableElement>
						{/* We don't want to highlight the margin, so place it outside */}
						<FavoriteItemSpacer />
					</Fragment>
				))}
			</ListContainer>
		</Container>
	);
}

const Container = styled(View, {
	flex: 1,
});

const ListContainer = styled(View, {
	flex: 1,
});

const FavoriteItemSpacer = styled(View, {
	height: 15,
});

export default FavoriteList;
