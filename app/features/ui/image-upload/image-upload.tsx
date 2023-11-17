import { useFetcher } from "@remix-run/react"
import { useEffect, useRef, useState } from "react"
import { FaTrash } from "react-icons/fa6/index.js"
import { $path } from "remix-routes"
import { useControlField, useField } from "remix-validated-form"
import { isTypeofFieldError } from "~/lib"
import { action } from "~/routes/api.upload-photo"
import { action as deleteAction } from "~/routes/api.delete-photo"
import { css } from "~/styled-system/css"
import { VStack } from "~/styled-system/jsx"

type Props = {
	label: string
	required?: boolean
	name: string
	folder: string
	onImageUpload?: (url: string) => void
	onImageDelete?: () => void
}

export function ImageUpload({
	label,
	required = false,
	name,
	folder,
	onImageUpload,
	onImageDelete,
}: Props) {
	const { error, setTouched, clearError } = useField(name)
	const [img, setImg] = useControlField<string>(name)
	const [uploadedFile, setUploadedFile] = useState<File | null>(null)
	const [formError, setFormError] = useState("")
	const fileRef = useRef<HTMLInputElement>(null)
	const fetcher = useFetcher<typeof action>()
	const deleteFetcher = useFetcher<typeof deleteAction>()

	function onClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
		setTouched(true)
		e.preventDefault()
		fileRef.current?.click()
	}

	function handleSelectedFile(e: React.ChangeEvent<HTMLInputElement>) {
		const files = Array.from(e.target.files || [])
		const imageFile = files[0]

		if (!imageFile) return
		setUploadedFile(imageFile)
		const contentType = "image/jpg"
		fetcher.submit(
			{ filename: imageFile.name, contentType, folder },
			{
				method: "post",
				action: $path("/api/upload-photo"),
			},
		)
	}

	async function uploadImage(url: string, file: File, contentType: string) {
		await fetch(url, {
			body: file,
			method: "PUT",
			headers: { "Content-Type": contentType },
		})
		const img = url.split("?")[0]
		setImg(img)
		onImageUpload?.(img)
		clearError()
	}

	async function deleteImage() {
		const split = img.split(`${folder}/`)
		deleteFetcher.submit(
			{ filename: split[split.length - 1] as string, folder },
			{ method: "post", action: $path("/api/delete-photo") },
		)
	}

	useEffect(() => {
		if (deleteFetcher.data && !isTypeofFieldError(deleteFetcher.data)) {
			if (deleteFetcher.data.data === true) {
				setImg("")
				onImageDelete?.()
			} else {
				setFormError("Error deleting image.")
			}
		}
	}, [deleteFetcher.data, onImageDelete, setImg])

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
			setFormError(fetcher.data.presignedURL.message)
		}
	}, [fetcher.data, uploadedFile])

	return (
		<VStack gap={1} alignItems="flex-start" width={"100%"}>
			<label htmlFor={name}>
				<span className={css({ textStyle: "paragraph" })}>
					{label}{" "}
					{required && <span className={css({ textStyle: "error" })}>*</span>}
				</span>
			</label>
			<input type="hidden" name={name} value={img} />
			{img ? (
				<div className={css({ width: "100%", position: "relative" })}>
					<img
						className={css({
							width: "100%",
							aspectRatio: "16/9",
							objectFit: "cover",
							borderRadius: "8px",
							backgroundColor: "gray",
						})}
						src={img}
						alt="free date thumbnail"
					/>
					<button
						onClick={deleteImage}
						type="button"
						className={css({
							cursor: "pointer",
							position: "absolute",
							top: "8px",
							right: "8px",
						})}
					>
						<FaTrash
							size={20}
							className={css({
								color: "secondary",
							})}
						/>
					</button>
				</div>
			) : (
				<>
					<button
						onClick={onClick}
						type="button"
						className={css({
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							justifyContent: "center",
							border: "1px solid",
							borderColor: "gray",
							borderRadius: "8px",
							width: "100%",
							padding: "32px",
							cursor: "pointer",
						})}
					>
						<span>Click to upload</span>
					</button>
					<input
						className={css({ display: "none" })}
						type="file"
						accept="image/png, image/gif, image/jpeg, image/webp"
						ref={fileRef}
						onChange={handleSelectedFile}
					/>
				</>
			)}
			{formError ? (
				<p className={css({ textStyle: "error" })}>{formError}</p>
			) : error ? (
				<p className={css({ textStyle: "error" })}>{error}</p>
			) : null}
		</VStack>
	)
}
