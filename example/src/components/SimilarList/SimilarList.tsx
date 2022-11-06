import React from "react";
import { View } from "react-native";
import { HighlightableElement } from "react-native-highlight-overlay";
import { styled } from "../../styled";

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
		<Container>
			<ListHeader
				title="Similar broadcast"
				onHighlightPressed={() => {
					const randomIdx = Math.round(Math.random() * (SIMILAR_ITEMS.length - 1));
					const item = SIMILAR_ITEMS[randomIdx];
					setHighlightId(getUniqueKeyForItem(item));
				}}
			/>
			<ListContainer>
				{SIMILAR_ITEMS.map((item) => (
					<HighlightableElement
						key={getUniqueKeyForItem(item)}
						id={getUniqueKeyForItem(item)}
						options={{
							mode: "custom",
							clickthroughHighlight: false,
							createPath: ({ x, y, width, height }) =>
								[
									M(x + width * 0.5, y),
									L(x + width * 0.65, y + height * 0.33),
									L(x + width, y + height * 0.33),
									L(x + width * 0.7, y + height * 0.6),
									L(x + width * 0.85, y + height),

									L(x + width * 0.5, y + height * 0.75),

									L(x + width * 0.15, y + height),
									L(x + width * 0.3, y + height * 0.6),
									L(x, y + height * 0.33),
									L(x + width * 0.35, y + height * 0.33),
									z,
								].join(" "),
						}}
					>
						<SimilarItem {...item} />
					</HighlightableElement>
				))}
			</ListContainer>
		</Container>
	);
}

const M = (x: number, y: number) => `M ${x} ${y}`;
const L = (x: number, y: number) => `L ${x} ${y}`;
const z = "z";

const Container = styled(View, {
	flex: 1,
});

const ListContainer = styled(View, {
	flex: 1,
	flexDirection: "row",
	justifyContent: "space-between",
});

export default SimilarList;
