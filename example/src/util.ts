export const getRandomImage = (
	pxSize: number | { width: number; height: number },
	randomIdx: number
) =>
	typeof pxSize === "number"
		? `https://picsum.photos/${pxSize}?random=${randomIdx}`
		: `https://picsum.photos/${pxSize.width}/${pxSize.height}?random=${randomIdx}`;
