import React from "react";

import type { HighlightOverlayProps, OverlayStyle } from "../HighlightOverlay";

export type OverlayData = {
	entering: HighlightOverlayProps["entering"];
	exiting: HighlightOverlayProps["exiting"];
	onDismiss: HighlightOverlayProps["onDismiss"];
} & Required<OverlayStyle>;

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

export type SetCurrentActiveOverlay = (data: OverlayData | null) => void;

export type GetCurrentActiveOverlay = () => OverlayData | null;

const unused = (name: string) => () => {
	throw new Error(
		`No implementation for '${name}' found! Did you forget to wrap your app in <HighlightableElementProvider />?`
	);
};

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
			/**
			 * Sets the data for the current active overlay. Set `null` when no overlay is active.
			 * @since 1.3
			 */
			readonly setCurrentActiveOverlay: SetCurrentActiveOverlay;
			/**
			 * Get the data for the current active overlay, or `null` when no overlay is active.
			 * @since 1.3
			 */
			readonly getCurrentActiveOverlay: GetCurrentActiveOverlay;
		}
	]
>([
	{},
	{
		addElement: unused("addElement"),
		removeElement: unused("removeElement"),
		rootRef: null,
		getRootRef: unused("getRootRef"),
		setCurrentActiveOverlay: unused("setCurrentActiveOverlay"),
		getCurrentActiveOverlay: unused("getCurrentActiveOverlay"),
	},
]);

export default HighlightableElementContext;
