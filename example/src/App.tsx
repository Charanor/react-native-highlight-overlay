import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { HighlightableElementProvider, HighlightOverlay } from "react-native-highlight-overlay";

import FavoriteList from "./components/FavoriteList";
import Header from "./components/Header";
import SimilarList from "./components/SimilarList";
import { styled } from "./styled";

export const HIGHLIGHTED_ID_1 = "one";
export const HIGHLIGHTED_ID_2 = "two";

function App() {
	const [rootRef, setRootRef] = useState<React.Component<unknown> | null>(null);
	const [highlightedId, setHighlightId] = useState<string | null>(null);

	return (
		<HighlightableElementProvider rootRef={rootRef}>
			<Header />
			<ScrollView ref={setRootRef}>
				<Container>
					<FavoriteList {...{ setHighlightId }} />
					<SimilarList {...{ setHighlightId }} />
				</Container>
				<HighlightOverlay
					highlightedElementId={highlightedId}
					onDismiss={() => setHighlightId(null)}
				/>
			</ScrollView>
		</HighlightableElementProvider>
	);
}

const Container = styled(View, {
	backgroundColor: "#F0F0F0",
	padding: 25,
});

export default App;
