import React from "react";

export type HighlightOffset = {
	x: number;
	y: number;
};

export type HighlightOptions = CommonOptions & (RectangleOptions | CircleOptions);

export type CommonOptions = {
	/**
	 * If true, allows the user to click elements inside the highlight. Otherwise clicking inside the
	 * highlight will act the same as clicking outside the highlight, calling `onDismiss`.
	 * @default true
	 */
	// Typo - should be clickThrough (click-through is hyphenated).
	clickthroughHighlight?: boolean;

	/**
	 * If you want your highlight to be offset slightly from its original position you can manually
	 * specify an offset here. Especially useful if your highlight is inside of a scroll view
	 * (see example project).
	 *
	 * @since 1.3
	 */
	offset?: HighlightOffset;
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

export type RootRefGetter = () => React.Component<unknown> | null;

const HighlightableElementContext = React.createContext<
	readonly [
		/**
		 * @since 1.0
		 */
		elements: Readonly<ElementsRecord>,
		actions: {
			/**
			 * @since 1.0
			 */
			readonly addElement: AddElement;
			/**
			 * @since 1.0
			 */
			readonly removeElement: RemoveElement;
			/**
			 * @deprecated since version `1.3`, use `getRootRef()` instead.
			 */
			readonly rootRef: React.Component<unknown> | null;
			/**
			 * @returns the reference to the root element used to calculate offsets for the highlights.
			 * @since 1.3
			 */
			readonly getRootRef: RootRefGetter;
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
		getRootRef: () => {
			throw new Error(
				"No implementation for 'getRootRef' found! Did you forget to wrap your app in <HighlightableElementProvider />?"
			);
		},
	},
]);

export default HighlightableElementContext;
