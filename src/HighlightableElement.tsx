import type { PropsWithChildren } from "react";
import React, { useEffect, useRef } from "react";
import type { HostComponent, StyleProp, ViewStyle } from "react-native";
import { View } from "react-native";

import { useHighlightableElements } from "./context";
import type { HighlightOptions } from "./context/context";

export type HighlightableElementProps = PropsWithChildren<{
	/**
	 * The id used by the HighlightOverlay to find this element.
	 * @since 1.0
	 */
	id: string;
	/**
	 * The options that decide how this element should look. If left undefined, it only highlights the element.
	 * @since 1.2
	 */
	options?: HighlightOptions;
	style?: StyleProp<ViewStyle>;
}>;

/**
 * A component that allows its children to be highlighted by the `HighlightOverlay` component.
 *
 * @since 1.0
 */
const HighlightableElement = React.memo(
	({ id, options, children, style }: HighlightableElementProps) => {
		const ref = useRef<View | null>(null);

		const [_, { addElement, getRootRef }] = useHighlightableElements();
		const rootRef = getRootRef();

		useEffect(() => {
			const refVal = ref.current;
			if (refVal == null || rootRef == null) {
				return;
			}

			const timeoutId = setTimeout(() => {
				ref.current?.measureLayout(
					// This is a typing error on ReactNative's part. 'rootRef' is a valid reference.
					rootRef as unknown as HostComponent<unknown>,
					(x, y, width, height) => {
						addElement(id, children, { x, y, width, height }, options);
					},
					() => {
						ref.current?.measureInWindow((x, y, width, height) => {
							addElement(id, children, { x, y, width, height }, options);
						});
					}
				);
			}, 0);

			return () => {
				clearTimeout(timeoutId);
			};
			// We don't want to re-run this effect when addElement or removeElement changes.
			// eslint-disable-next-line react-hooks/exhaustive-deps
		}, [id, children, rootRef]);

		return (
			<View collapsable={false} ref={ref} style={style}>
				{children}
			</View>
		);
	}
);

export default HighlightableElement;
