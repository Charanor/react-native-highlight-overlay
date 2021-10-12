import React from "react";

export type Bounds = {
	x: number;
	y: number;
	width: number;
	height: number;
};
export type ElementsRecord = Record<string, { node: React.ReactNode; bounds: Bounds }>;
export type AddElement = (id: string, node: React.ReactNode, bounds: Bounds) => void;
export type RemoveElement = (id: string) => void;

const HighlightableElementContext = React.createContext<
	readonly [
		elements: ElementsRecord,
		actions: {
			readonly addElement: AddElement;
			readonly removeElement: RemoveElement;
			rootRef: React.Component<unknown> | null;
		}
	]
>([
	{},
	{
		addElement: () => {
			throw new Error(
				"No implementation for 'addElement' found! Did you forget to wrap your app in <HighlightableElementProvider />?"
			);
		},
		removeElement: () => {
			throw new Error(
				"No implementation for 'removeElement' found! Did you forget to wrap your app in <HighlightableElementProvider />?"
			);
		},
		rootRef: null,
	},
]);

export default HighlightableElementContext;
