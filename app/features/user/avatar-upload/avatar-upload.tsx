import { useFetcher } from "@remix-run/react"
import { useRef } from "react"
import { $path } from "remix-routes"
import { useViewer } from "~/hooks"
import { css } from "~/styled-system/css"

const defaultStyles = css.raw({
	width: "120px",
	height: "120px",
	borderRadius: "50%",
	backgroundColor: "gray",
	objectFit: "cover",
	position: "relative",
})

type Props = {
	value?: string | null
	userName: string
	name: string
	onUploadComplete: (url: string) => void
}

export default function AvatarUpload({
	value,
	userName,
	name,
	onUploadComplete,
}: Props) {
	const fileRef = useRef<HTMLInputElement>(null)
	const fetcher = useFetcher()
	const { getViewerId } = useViewer()

	function onClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
		e.preventDefault()
		fileRef.current?.click()
		// fetcher.submit(e.currentTarget.form, {
		// 	method: "POST",
		// 	action: $path("/api/upload-photo"),
		// })
	}

	function handleSelectedFile(e: React.ChangeEvent<HTMLInputElement>) {
		const files = Array.from(e.target.files || [])
		const imageFile = files[0]

		// TODO: Fix this.
		if (!imageFile) return
		const contentType = "image/jpg"
		const formData = new FormData()
		formData.append("filename", imageFile)
		formData.append("contentType", contentType)
		formData.append("folder", "profile-picture")
		formData.append("userId", getViewerId())
		fetcher.submit(formData, {
			method: "POST",
			action: $path("/api/upload-photo"),
		})
	}

	// const [generate] = useMutation(GeneratePresignedUrlDocument)

	// const handleFileSelected = async (e: React.ChangeEvent<HTMLInputElement>) => {
	// 	const files = Array.from(e.target.files || [])
	// 	const imageFile = files[0]

	// 	if (!imageFile) return
	// 	const contentType = "image/jpg"
	// 	setLoading(true)
	// 	await generate({
	// 		variables: {
	// 			input: {
	// 				filename: imageFile.name,
	// 				folder: "profile-picture",
	// 				contentType,
	// 			},
	// 		},
	// 		async onCompleted(data) {
	// 			match(data.generatePresignedUrl)
	// 				.with({ __typename: "AuthError" }, () => logout())
	// 				.with({ __typename: "Error" }, ({ message }) => setFormError(message))
	// 				.with(
	// 					{ __typename: "GeneratePresignedUrlResult" },
	// 					async ({ data }) => {
	// 						await axios.put(data, imageFile, {
	// 							headers: {
	// 								"Content-Type": contentType,
	// 							},
	// 						})
	// 						onUploadComplete(data.split("?")[0])
	// 						setLoading(false)
	// 					},
	// 				)
	// 				.otherwise(() => null)
	// 		},
	// 	})
	// }

	return (
		<fetcher.Form>
			<input name="name" type="hidden" value={"hello"} />
			<input
				name={name}
				className={css({ display: "none" })}
				type="file"
				accept="image/png, image/gif, image/jpeg, image/webp"
				ref={fileRef}
				onChange={handleSelectedFile}
			/>
			<div className={css({ position: "relative", width: "120px" })}>
				{value ? (
					<img className={css(defaultStyles)} alt="user avatar" src={value} />
				) : (
					<div
						className={css(
							{
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
							},
							defaultStyles,
						)}
					>
						<p
							className={css({
								textStyle: "paragraph",
								fontSize: "40px",
								fontWeight: "bold",
								color: "white",
							})}
						>
							{userName[0]}
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
					{value ? "Edit" : "Add"}
				</button>
				{/* {formError && (
				<span className={css({ textStyle: "error" })}>{formError}</span>
			)} */}
			</div>
		</fetcher.Form>
	)
}
