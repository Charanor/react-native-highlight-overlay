import { JSXElementConstructor, PropsWithChildren } from "react";
import { StyleProp, StyleSheet } from "react-native";

type StyledStyle<TStyle> = {
	[key in keyof TStyle]: TStyle[key];
};

type ComponentStyle<TComponent> = TComponent extends JSXElementConstructor<infer TProps>
	? TProps extends {
			style?: infer TStyle;
	  }
		? TStyle
		: never
	: never;

type ActualStyle<TStyle> = TStyle extends StyleProp<infer TRealStyle> ? TRealStyle : TStyle;

type PropsOf<TComponent> = TComponent extends JSXElementConstructor<infer TInferProps>
	? TInferProps
	: never;

type MakeOptional<T extends TK, TK> = NonNullable<Omit<T, keyof DefinedKeys<TK>> & Partial<TK>>;

type DefinedKeys<T> = {
	[key in keyof T as undefined extends T[key] ? never : key]: T[key];
};

export const styled = <TComponent extends JSXElementConstructor<any>,>(
	ComponentType: TComponent,
	style?: StyledStyle<ActualStyle<ComponentStyle<TComponent>>>,
	props?: TComponent extends JSXElementConstructor<infer TProps> ? Partial<TProps> : never
) => {
	const nativeStyle = StyleSheet.create({ theStyle: style }).theStyle;

	type StyledComponentProps = PropsWithChildren<
		MakeOptional<PropsOf<TComponent>, typeof props> & {
			style?: ComponentStyle<TComponent>;
		}
	>;

	return function StyledComponent({ style: userStyle, ...userProps }: StyledComponentProps) {
		return (
			// @ts-expect-error Bad React typing
			<ComponentType
				style={userStyle != null ? [nativeStyle, userStyle] : nativeStyle}
				{...props}
				{...userProps}
			/>
		);
	};
};
