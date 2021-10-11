import React, { useRef, useState } from "react";
import { Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import {
	HighlightableElement,
	HighlightableElementProvider,
	HighlightOverlay,
} from "react-native-highlight-overlay";

export const HIGHLIGHTED_ID_1 = "one";
export const HIGHLIGHTED_ID_2 = "two";

function App() {
	const [highlightedId, setHighlightId] = useState<string | null>(null);
	const [rootRef, setRootRef] = useState<View | null>(null);

	return (
		<HighlightableElementProvider rootRef={rootRef}>
			<View style={styles.container} ref={setRootRef}>
				<HighlightableElement id={HIGHLIGHTED_ID_1}>
					<Pressable
						style={{
							backgroundColor: "cyan",
							padding: 10,
							borderRadius: 10,
							marginBottom: 10,
						}}
						onPress={() => {
							setHighlightId(HIGHLIGHTED_ID_2);
						}}
					>
						<Text style={{ color: "black" }}>Switch highlight to orange button</Text>
					</Pressable>
				</HighlightableElement>
				<HighlightableElement id={HIGHLIGHTED_ID_2}>
					<Pressable
						style={{
							backgroundColor: "orange",
							padding: 10,
							borderRadius: 10,
							marginBottom: 10,
						}}
						onPress={() => {
							setHighlightId(HIGHLIGHTED_ID_1);
						}}
					>
						<Text style={{ color: "black" }}>Switch highlight to cyan button</Text>
					</Pressable>
				</HighlightableElement>
				<Pressable
					style={{
						backgroundColor: "blue",
						padding: 10,
						borderRadius: 10,
						marginBottom: 10,
					}}
					onPress={() => setHighlightId("this id does not exist")}
				>
					<Text style={{ color: "white" }}>Turn off</Text>
				</Pressable>
			</View>
			<HighlightOverlay
				highlightedElementId={highlightedId}
				onDismiss={() => setHighlightId(null)}
			/>
		</HighlightableElementProvider>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#F0F0F0",
	},
});

export default App;
