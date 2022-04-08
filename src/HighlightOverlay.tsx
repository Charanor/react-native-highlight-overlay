import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import Svg, { ClipPath, Defs, G, Path, Rect } from "react-native-svg";

import constructClipPath from "./constructClipPath";
import { useHighlightableElements } from "./context";
import type { Bounds } from "./context/context";

export type HighlightOverlayProps = {
	/**
	 * The id of the highlighted element. If `undefined`, `null`, or if the id does not exist,
	 * the overlay is hidden.
	 *
	 * @since 1.0.0
	 */
	highlightedElementId?: string | null;

	/**
	 * Called when the highlight is requesting to be dismissed. This is usually when the overlay
	 * (non-highlighted) part of the screen is pressed. The exact behavior is decided by each
	 * HighlightableElement.
	 *
	 * @since 1.0.0
	 */
	onDismiss: () => void;
};

/**
 * An overlay that optionally takes the id of a `HighlightableElement` to highlight
 * (exclude from the overlay). This is not a modal, so it should be placed on top of all elements
 * you want it to cover.
 *
 * **NOTE:** If the highlighted element is inside of a `ScrollView`, the `HighlightOverlay` should also
 * be inside of that scroll view to ensure that the highlight is correctly placed.
 *
 * @since 1.0.0
 */
function HighlightOverlay({ highlightedElementId, onDismiss }: HighlightOverlayProps) {
	const [parentSize, setParentSize] = useState<Bounds | null>();

	const [elements] = useHighlightableElements();
	const highlightedElementData =
		highlightedElementId != null ? elements[highlightedElementId] : null;
	const clickThrough = highlightedElementData?.options?.clickthroughHighlight ?? true;

	return (
		<View
			style={StyleSheet.absoluteFill}
			onLayout={({ nativeEvent: { layout } }) => setParentSize(layout)}
			pointerEvents="box-none"
		>
			{highlightedElementData != null && parentSize != null && (
				<Svg
					style={StyleSheet.absoluteFill}
					pointerEvents={clickThrough ? "none" : "auto"}
					onPress={!clickThrough ? onDismiss : undefined}
					key={highlightedElementId}
				>
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
