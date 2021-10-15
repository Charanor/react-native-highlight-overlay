import type { PropsWithChildren } from "react";
import React, { useEffect, useRef } from "react";
import type { HostComponent } from "react-native";
import { View } from "react-native";

import { useHighlightableElements } from "./context";
import type { HighlightOptions } from "./context/context";

export type HighlightableElementProps = PropsWithChildren<{
	/** The id used by the HighlightOverlay to find this element. */
	id: string;
	/** The options that decide how this element should look. If left undefined, it only highlights the element. */
	options?: HighlightOptions;
}>;

function HighlightableElement({ id, options, children }: HighlightableElementProps) {
	const ref = useRef<View | null>(null);

	const [_, { addElement, removeElement, rootRef }] = useHighlightableElements();

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
					console.error(`Error measuring layout of focused element with id ${id}.`);
				}
			);
		}, 0);

		return () => {
			clearTimeout(timeoutId);
			removeElement(id);
		};
		// We don't want to re-run this effect when addElement or removeElement changes.
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id, children, rootRef]);

	return (
		<View collapsable={false} ref={ref}>
			{children}
		</View>
	);
}

export default HighlightableElement;
