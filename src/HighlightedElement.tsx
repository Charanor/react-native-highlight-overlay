import type { PropsWithChildren } from "react";
import React, { useEffect, useRef } from "react";
import { View } from "react-native";

import { useHighlightableElements } from "./context";

export type HighlightableElementProps = PropsWithChildren<{
	/** The id used by the HighlightOverlay to find this element. */
	id: string;
}>;

function HighlightableElement({ id, children }: HighlightableElementProps) {
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
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore
				rootRef,
				(x, y) => {
					addElement(id, children, { x, y });
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
