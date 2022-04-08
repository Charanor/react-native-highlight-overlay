import type { PropsWithChildren } from "react";
import React, { useCallback, useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";
import isEqual from "lodash.isequal";

import type { AddElement, ElementsRecord, RemoveElement } from "./context";
import HighlightableElementContext from "./context";

export type HighlightableElementProviderProps = PropsWithChildren<{
	/**
	 * The reference to the root of the DOM. If (and only if) this is left as undefined,
	 * this component will instantiate a View as a child and use that as the root instead.
	 * You usually don't need to set this, unless either:
	 *  - The wrapper we provide is making your app look weird. This can happen when you use
	 *    tab bars / headers / etc.
	 *  - You have several providers for whatever reason (you probably shouldn't).
	 *
	 * @since 1.0.0
	 */
	rootRef?: React.Component<unknown> | null;
}>;

/**
 * The context provider that provides `HighlightOverlay` with the id's of all the
 * `HighlightableElement`s.
 *
 * If the `rootRef` prop is not set this provider must be placed top-level since it also serves as
 * the relative measuring point for the highlights.
 *
 * If the `rootRef` prop **is** set it only has to be above the `rootRef` and all `HighlightOverlay`
 * and `HighlightableElement` that is being used.
 *
 * @since 1.0.0
 */
function HighlightableElementProvider({
	rootRef: externalRootRef,
	children,
}: HighlightableElementProviderProps) {
	const [rootRef, setRootRef] = useState<React.Component<unknown> | null>(
		externalRootRef ?? null
	);
	const [elements, setElements] = useState<ElementsRecord>({});

	const addElement = useCallback<AddElement>(
		(id, node, bounds, options) => {
			if (
				!elements[id] ||
				!isEqual(bounds, elements[id].bounds) ||
				!isEqual(options, elements[id].options)
			) {
				setElements((oldElements) => ({ ...oldElements, [id]: { node, bounds, options } }));
			}
		},
		[elements]
	);

	const removeElement: RemoveElement = useCallback<RemoveElement>((id) => {
		setElements((oldElements) => {
			delete oldElements[id];
			return { ...oldElements };
		});
	}, []);

	const contextValue = useMemo(
		() =>
			Object.freeze([
				elements,
				{ addElement, removeElement, rootRef: externalRootRef ?? rootRef },
			] as const),
		[addElement, elements, externalRootRef, removeElement, rootRef]
	);

	if (externalRootRef == null) {
		return (
			<HighlightableElementContext.Provider value={contextValue}>
				<View style={styles.rootWrapper} ref={setRootRef} collapsable={false}>
					{children}
				</View>
			</HighlightableElementContext.Provider>
		);
	} else {
		return (
			<HighlightableElementContext.Provider value={contextValue}>
				{children}
			</HighlightableElementContext.Provider>
		);
	}
}

const styles = StyleSheet.create({
	rootWrapper: {
		flex: 1,
	},
});

export default HighlightableElementProvider;
