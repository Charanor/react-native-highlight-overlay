import React from "react";
import { StyleSheet, View } from "react-native";
import { HighlightableElement } from "react-native-highlight-overlay";

import ListHeader from "../ListHeader";
import { getRandomImage } from "../../util";

import FavoriteItem, { ITEM_HEIGHT } from "./FavoriteItem";

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
		<View style={styles.container}>
			<ListHeader
				title={`My favourites (${FAVORITES_LIST.length})`}
				onHighlightPressed={() => {
					const randomIdx = Math.round(Math.random() * (FAVORITES_LIST.length - 1));
					const item = FAVORITES_LIST[randomIdx];
					setHighlightId(getUniqueKeyForItem(item));
				}}
			/>
			<View style={styles.listContainer}>
				{FAVORITES_LIST.map((favItem, idx, arr) => (
					<HighlightableElement
						key={getUniqueKeyForItem(favItem)}
						id={getUniqueKeyForItem(favItem)}
					>
						<FavoriteItem style={styles.favoriteItem} {...favItem} />
					</HighlightableElement>
				))}
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	listContainer: {
		flex: 1,
	},
	favoriteItem: {
		marginBottom: 15,
	},
});

export default FavoriteList;
