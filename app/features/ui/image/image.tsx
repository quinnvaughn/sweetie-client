import { SystemStyleObject } from "@pandacss/dev"
import { useImageLoaded } from "~/hooks/use-image-loaded"
import { css } from "~/styled-system/css"

const defaultImage = css.raw({
	width: "100%",
	height: "100%",
	objectFit: "cover",
	borderRadius: "8px",
	backgroundColor: "#eeeeee",
})

const errorImage = css.raw({
	width: "100%",
	height: "100%",
	objectFit: "cover",
	borderRadius: "8px",
	border: "1px solid #eeeeee",
	textStyle: "paragraph",
	textAlign: "center",
})

type Props = {
	src: string
	alt: string
	css?: SystemStyleObject
	cva?: string
	loading?: "lazy" | "eager"
}

export function Image({
	src,
	alt,
	css: cssProp,
	cva,
	loading = "eager",
}: Props) {
	const { error, loaded } = useImageLoaded(src)

	return error ? (
		<div className={cva ? cva : css(errorImage, cssProp)}>Image not found</div>
	) : loaded ? (
		<img
			loading={loading}
			src={src}
			alt={alt}
			className={cva ? cva : css(cssProp)}
		/>
	) : (
		<div className={cva ? cva : css(defaultImage, cssProp)} />
	)
}
