import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import Svg, { ClipPath, Defs, G, Path, Rect } from "react-native-svg";

import constructClipPath from "./constructClipPath";
import { useHighlightableElements } from "./context";
import type { Bounds } from "./context/context";

export type HighlightOverlayProps = {
	highlightedElementId?: string | null;
	onDismiss: () => void;
};

function HighlightOverlay({ highlightedElementId, onDismiss }: HighlightOverlayProps) {
	const [elements] = useHighlightableElements();
	const highlightedElementData =
		highlightedElementId != null ? elements[highlightedElementId] : null;

	const [parentSize, setParentSize] = useState<Bounds | null>();

	return (
		<View
			style={StyleSheet.absoluteFill}
			onLayout={({ nativeEvent: { layout } }) => setParentSize(layout)}
			pointerEvents="box-none"
		>
			{highlightedElementData != null && parentSize != null && (
				<Svg style={StyleSheet.absoluteFill} pointerEvents="box-none">
					<G>
						<Defs>
							<ClipPath id="elementBounds">
								<Path
									d={constructClipPath(highlightedElementData, parentSize)}
									clipRule="evenodd"
								/>
							</ClipPath>
						</Defs>
						<Rect
							x={0}
							y={0}
							width="100%"
							height="100%"
							clipPath="#elementBounds"
							fill="black"
							fillOpacity={0.7}
							onPress={onDismiss}
						/>
					</G>
				</Svg>
			)}
		</View>
	);
}

export default HighlightOverlay;
