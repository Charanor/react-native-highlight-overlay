import type { PropsWithChildren } from "react";
import React from "react";
import type { StyleProp, ViewStyle } from "react-native";
import { Pressable, StyleSheet, View } from "react-native";
import Animated from "react-native-reanimated";

import { useHighlightableElements } from "./context";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export type FadeDuringHighlightProps = PropsWithChildren<{
	style?: StyleProp<ViewStyle>;
}>;

/**
 * A component that will fade its children (cover them with a view) when a `HighlightOverlay` is visible.
 * This is mostly useful if you are forced to place your `HighlightOverlay` inside of a view (e.g. scroll view)
 * and want other items outside of the view to also be faded when the highlight is visible.
 *
 * @since 1.3
 */
function FadeDuringHighlight({ children, style }: FadeDuringHighlightProps): JSX.Element {
	const [_, { getCurrentActiveOverlay }] = useHighlightableElements();

	const currentActiveOverlay = getCurrentActiveOverlay();

	return (
		<View style={style}>
			{children}
			{currentActiveOverlay != null && (
				<AnimatedPressable
					entering={currentActiveOverlay.entering ?? undefined}
					exiting={currentActiveOverlay.exiting ?? undefined}
					onPress={currentActiveOverlay.onDismiss}
					style={StyleSheet.absoluteFill}
				>
					<View
						style={[
							StyleSheet.absoluteFill,
							{
								backgroundColor: currentActiveOverlay.color,
								opacity: currentActiveOverlay.opacity,
							},
						]}
					/>
				</AnimatedPressable>
			)}
		</View>
	);
}

export default FadeDuringHighlight;
