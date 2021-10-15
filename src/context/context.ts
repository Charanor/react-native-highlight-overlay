import React from "react";

export type HighlightOptions = CommonOptions & (RectangleOptions | CircleOptions);

export type CommonOptions = {
	/**
	 * If true, allows the user to click elements inside the highlight. Otherwise clicking inside the
	 * highlight will act the same as clicking outside the highlight, calling `onDismiss`.
	 * @default true
	 */
	clickthroughHighlight?: boolean;
};

export type RectangleOptions = {
	mode: "rectangle" | undefined;
	/**
	 * The border radius of the rectangle.
	 * @default 0
	 */
	borderRadius?: number;
	/**
	 * The padding of the rectangle.
	 * @default 0
	 */
	padding?: number;
};

export type CircleOptions = {
	mode: "circle";
	/**
	 * The padding of the circle.
	 * @default 0
	 */
	padding?: number;
};

export type Bounds = {
	x: number;
	y: number;
	width: number;
	height: number;
};
export type ElementsRecord = Record<
	string,
	{
		node: React.ReactNode;
		bounds: Bounds;
		options?: HighlightOptions;
	}
>;
export type AddElement = (
	id: string,
	node: React.ReactNode,
	bounds: Bounds,
	options?: HighlightOptions
) => void;
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
