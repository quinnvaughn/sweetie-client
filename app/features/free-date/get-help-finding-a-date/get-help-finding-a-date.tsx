import { useState } from "react"
import { css } from "~/styled-system/css"
import { FindingADateModal } from ".."

export function GetHelpFindingADate() {
	const [open, setOpen] = useState(false)

	return (
		<>
			<div id="help-finding-date">
				Not finding what you're looking for?{" "}
				<button
					type="button"
					onClick={() => setOpen(true)}
					className={css({
						color: "secondary",
						_hover: {
							textDecoration: "underline",
							cursor: "pointer",
						},
					})}
				>
					Get help finding something you'll like.
				</button>
			</div>
			{open && <FindingADateModal onClose={() => setOpen(false)} />}
		</>
	)
}
