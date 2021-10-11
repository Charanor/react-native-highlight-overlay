import React, { PropsWithChildren, useCallback, useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";

import HighlightableElementContext, { AddElement, ElementsRecord, RemoveElement } from "./context";

export type HighlightableElementProviderProps = PropsWithChildren<{
	/**
	 * The reference to the root of the DOM. If (and only if) this is left as undefined,
	 * this component will instantiate a View as a child and use that as the root instead.
	 * You usually don't need to set this, unless either:
	 *  - The wrapper we provide is making your app look weird. This can happen when you use
	 *    tab bars / headers / etc.
	 *  - You have several providers for whatever reason (you probably shouldn't).
	 */
	rootRef?: View | null;
}>;

function HighlightableElementProvider({
	rootRef: externalRootRef,
	children,
}: HighlightableElementProviderProps) {
	const [rootRef, setRootRef] = useState<View | null>(externalRootRef ?? null);
	const [elements, setElements] = useState<ElementsRecord>({});

	const addElement = useCallback<AddElement>((id, node, position) => {
		setElements((oldElements) => ({ ...oldElements, [id]: { node, position } }));
	}, []);

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
