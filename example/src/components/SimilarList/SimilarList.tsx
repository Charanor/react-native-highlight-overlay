import React from "react";
import { StyleSheet, View } from "react-native";
import { HighlightableElement } from "react-native-highlight-overlay";

import { getRandomImage } from "../../util";
import ListHeader from "../ListHeader";

import SimilarItem, { ICON_SIZE } from "./SimilarItem";

const SIMILAR_ITEMS = [
	{
		title: "Top 15 rap",
		imageSource: { uri: getRandomImage(ICON_SIZE, 11) },
	},
	{
		title: "Radio Mirchi",
		imageSource: { uri: getRandomImage(ICON_SIZE, 12) },
	},
	{
		title: "SPB: Top 50",
		imageSource: { uri: getRandomImage(ICON_SIZE, 13) },
	},
];

const getUniqueKeyForItem = (item: typeof SIMILAR_ITEMS[number]) => item.title;

export type SimilarListProps = {
	setHighlightId: (id: string | null) => void;
};

function SimilarList({ setHighlightId }: SimilarListProps) {
	return (
		<View style={styles.container}>
			<ListHeader
				title="Similar brodcast"
				onHighlightPressed={() => {
					const randomIdx = Math.round(Math.random() * (SIMILAR_ITEMS.length - 1));
					const item = SIMILAR_ITEMS[randomIdx];
					setHighlightId(getUniqueKeyForItem(item));
				}}
			/>
			<View style={styles.listContainer}>
				{SIMILAR_ITEMS.map((item) => (
					<HighlightableElement
						key={getUniqueKeyForItem(item)}
						id={getUniqueKeyForItem(item)}
					>
						<SimilarItem {...item} />
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
		flexDirection: "row",
		justifyContent: "space-between",
	},
});

export default SimilarList;
