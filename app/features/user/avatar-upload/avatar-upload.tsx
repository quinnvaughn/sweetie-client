import { useFetcher } from "@remix-run/react"
import { useEffect, useRef, useState } from "react"
import { $path } from "remix-routes"
import { Image } from "~/features/ui"
import { useViewer } from "~/hooks"
import { isTypeofFieldError } from "~/lib"
import { action } from "~/routes/api.upload-photo"
import { css } from "~/styled-system/css"

type Props = {
	value?: string
}

export default function AvatarUpload({ value }: Props) {
	const fileRef = useRef<HTMLInputElement>(null)
	const fetcher = useFetcher<typeof action>()
	const { getViewerUsername } = useViewer()
	const [error, setError] = useState("")
	const [img, setImg] = useState(value || "")
	const [uploadedFile, setUploadedFile] = useState<File | null>(null)

	function onClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
		e.preventDefault()
		fileRef.current?.click()
	}

	function handleSelectedFile(e: React.ChangeEvent<HTMLInputElement>) {
		const files = Array.from(e.target.files || [])
		const imageFile = files[0]

		if (!imageFile) return
		setUploadedFile(imageFile)
		const contentType = "image/jpg"
		const formData = new FormData()
		formData.append("filename", imageFile.name)
		formData.append("contentType", contentType)
		formData.append("folder", "profile-picture")
		fetcher.submit(formData, {
			method: "post",
			action: $path("/api/upload-photo"),
		})
	}

	async function uploadImage(url: string, file: File, contentType: string) {
		await fetch(url, {
			body: file,
			method: "PUT",
			headers: { "Content-Type": contentType },
		})
		const img = url.split("?")[0]
		setImg(img)
		fetcher.submit(
			{ avatar: img },
			{
				method: "post",
				action: $path("/api/upload-avatar"),
			},
		)
	}

	useEffect(() => {
		if (
			fetcher.data &&
			!isTypeofFieldError(fetcher.data) &&
			fetcher.data.presignedURL?.__typename === "GeneratePresignedUrlResult"
		) {
			uploadImage(
				fetcher.data.presignedURL.data,
				uploadedFile as File,
				fetcher.data.contentType,
			)
		} else if (
			fetcher.data &&
			!isTypeofFieldError(fetcher.data) &&
			fetcher.data.presignedURL?.__typename === "Error"
		) {
			setError(fetcher.data.presignedURL.message)
		}
	}, [fetcher.data, uploadedFile])

	return (
		<fetcher.Form>
			<input
				className={css({ display: "none" })}
				type="file"
				accept="image/png, image/gif, image/jpeg, image/webp"
				ref={fileRef}
				onChange={handleSelectedFile}
			/>
			<div className={css({ position: "relative", width: "120px" })}>
				{img ? (
					<Image
						css={{
							width: "120px",
							height: "120px",
							borderRadius: "50%",
							backgroundColor: "gray",
							objectFit: "cover",
							position: "relative",
						}}
						alt="user avatar"
						src={img}
					/>
				) : (
					<div
						className={css({
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							width: "120px",
							height: "120px",
							borderRadius: "50%",
							backgroundColor: "gray",
							objectFit: "cover",
							position: "relative",
						})}
					>
						<p
							className={css({
								textStyle: "paragraph",
								fontSize: "40px",
								fontWeight: "bold",
								color: "white",
							})}
						>
							{getViewerUsername()[0].toUpperCase()}
						</p>
					</div>
				)}
				<button
					type="button"
					className={css({
						position: "absolute",
						bottom: "-8px",
						left: "50%",
						transform: "translate(-50%,0)",
						minHeight: "36px",
						paddingInline: "16px",
						borderRadius: "20px",
						border: "none",
						backgroundColor: "white",
						boxShadow: "rgba(0, 0, 0, 0.12) 0px 6px 16px !important",
						_hover: {
							cursor: "pointer",
						},
					})}
					onClick={onClick}
				>
					Upload
				</button>
				{error && <span className={css({ textStyle: "error" })}>{error}</span>}
			</div>
		</fetcher.Form>
	)
}
