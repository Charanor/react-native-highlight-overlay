import React from "react";
import { Pressable, StyleSheet, View } from "react-native";

import { useHighlightableElements } from "./context";

export type HighlightOverlayProps = {
	highlightedElementId?: string | null;
	onDismiss: () => void;
};

function HighlightOverlay({ highlightedElementId, onDismiss }: HighlightOverlayProps) {
	const [elements] = useHighlightableElements();
	const highlightedElementData =
		highlightedElementId != null ? elements[highlightedElementId] : null;

	return (
		<View style={StyleSheet.absoluteFill}>
			{highlightedElementId != null && (
				<>
					<Pressable onPress={onDismiss} style={styles.underlay} />
					{highlightedElementData != null && (
						<View
							style={[
								styles.highlightContainer,
								{
									left: highlightedElementData.position.x,
									top: highlightedElementData.position.y,
								},
							]}
						>
							{highlightedElementData.node}
						</View>
					)}
				</>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	underlay: {
		...StyleSheet.absoluteFillObject,
		backgroundColor: "black",
		opacity: 0.7,
	},
	highlightContainer: {
		position: "absolute",
	},
});

export default HighlightOverlay;
