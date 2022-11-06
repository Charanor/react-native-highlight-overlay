import React, { useEffect, useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import type { RectProps } from "react-native-svg";
import Svg, { ClipPath, Defs, Path, Rect } from "react-native-svg";

import constructClipPath from "./constructClipPath";
import { useHighlightableElements } from "./context";
import type { Bounds } from "./context/context";

const AnimatedSvg = Animated.createAnimatedComponent(Svg);

const DEFAULT_OVERLAY_STYLE: Required<OverlayStyle> = {
	color: "black",
	opacity: 0.7,
};

export type OverlayStyle = {
	/**
	 * The color of the overlay. Should not include alpha in the color, use `opacity` prop for that.
	 *
	 * @default "black"
	 * @since 1.3
	 */
	color?: string;

	/**
	 * The opacity of the overlay color.
	 *
	 * @default 0.7
	 * @since 1.3
	 */
	opacity?: number;
};

export type EnteringAnimation = Animated.AnimateProps<RectProps>["entering"];

export type HighlightOverlayProps = {
	/**
	 * The id of the highlighted element. If `undefined`, `null`, or if the id does not exist,
	 * the overlay is hidden.
	 *
	 * @since 1.0
	 */
	highlightedElementId?: string | null;

	/**
	 * Called when the highlight is requesting to be dismissed. This is usually when the overlay
	 * (non-highlighted) part of the screen is pressed. The exact behavior is decided by each
	 * HighlightableElement.
	 *
	 * @since 1.0
	 */
	onDismiss: () => void;

	/**
	 * The style of the overlay.
	 *
	 * @default { color: "black", opacity: 0.7 }
	 * @since 1.3
	 */
	overlayStyle?: OverlayStyle;

	/**
	 * The animation when the overlay is entering the screen. Defaults to `FadeIn`.
	 * Set to `null` (not `undefined`!) to disable animation.
	 *
	 * @default FadeIn
	 * @example
	 * import { FadeIn } from "react-native-reanimated";
	 * <HighlightOverlay entering={FadeIn} />
	 * @since 1.3
	 */
	entering?: EnteringAnimation | null;

	/**
	 * The animation when the overlay is exiting the screen. Defaults to `FadeOut`.
	 * Set to `null` (not `undefined`!) to disable animation.
	 *
	 * @default undefined
	 * @example
	 * import { FadeOut } from "react-native-reanimated";
	 * <HighlightOverlay exiting={FadeOut} />
	 * @since 1.3
	 */
	exiting?: EnteringAnimation | null;
};

/**
 * An overlay that optionally takes the id of a `HighlightableElement` to highlight
 * (exclude from the overlay). This is not a modal, so it should be placed on top of all elements
 * you want it to cover.
 *
 * **NOTE:** If the highlighted element is inside of a `ScrollView`, the `HighlightOverlay` should also
 * be inside of that scroll view to ensure that the highlight is correctly placed.
 *
 * @since 1.0
 */
const HighlightOverlay = React.memo(
	({
		highlightedElementId,
		onDismiss,
		overlayStyle = DEFAULT_OVERLAY_STYLE,
		entering = FadeIn,
		exiting = FadeOut,
	}: HighlightOverlayProps) => {
		const [elements, { setCurrentActiveOverlay }] = useHighlightableElements();
		const [parentSize, setParentSize] = useState<Bounds | null>();

		const highlightedElementData = useMemo(
			() => (highlightedElementId != null ? elements[highlightedElementId] : null),
			[elements, highlightedElementId]
		);

		const hasContent = highlightedElementData != null && parentSize != null;
		const clickThrough = highlightedElementData?.options?.clickthroughHighlight ?? true;
		const { color = DEFAULT_OVERLAY_STYLE.color, opacity = DEFAULT_OVERLAY_STYLE.opacity } =
			overlayStyle;

		useEffect(() => {
			setCurrentActiveOverlay(
				highlightedElementId == null
					? null
					: { color, opacity, entering, exiting, onDismiss }
			);
			// Dependency array should NOT include `onDismiss` prop
			// eslint-disable-next-line react-hooks/exhaustive-deps
		}, [color, entering, exiting, highlightedElementId, opacity, setCurrentActiveOverlay]);

		return (
			<View
				style={StyleSheet.absoluteFill}
				onLayout={({ nativeEvent: { layout } }) => setParentSize(layout)}
				pointerEvents="box-none"
			>
				{hasContent && (
					<AnimatedSvg
						key={highlightedElementId}
						pointerEvents={clickThrough ? "none" : "auto"}
						onPress={!clickThrough ? onDismiss : undefined}
						entering={entering ?? undefined}
						exiting={exiting ?? FadeOut}
						style={StyleSheet.absoluteFill}
					>
						<Defs>
							{Object.entries(elements).map(([id, element]) => (
								<ClipPath key={id} id={id}>
									<Path
										d={constructClipPath(element, parentSize)}
										clipRule="evenodd"
									/>
								</ClipPath>
							))}
						</Defs>
						<Rect
							x={0}
							y={0}
							width="100%"
							height="100%"
							clipPath={`#${highlightedElementId}`}
							fill={color}
							fillOpacity={opacity}
						/>
					</AnimatedSvg>
				)}
			</View>
		);
	},
	(prevProps, nextProps) =>
		// We need this here so we don't check the `onDismiss` prop.
		prevProps.highlightedElementId === nextProps.highlightedElementId &&
		prevProps.overlayStyle?.color === nextProps.overlayStyle?.color &&
		prevProps.overlayStyle?.opacity === nextProps.overlayStyle?.opacity &&
		prevProps.entering === nextProps.entering
);

export default HighlightOverlay;
